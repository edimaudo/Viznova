import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseCSV, buildChartPoints, rowsToCSV, inferCSVDefaults } from '../assets/js/csv.js';

const retailCSV = await readFile(new URL('../datasets/retail_monthly.csv', import.meta.url), 'utf8');

test('CSV parser handles BOM, quoted commas, escaped quotes and embedded newlines', () => {
  const rows = parseCSV('\uFEFFname,notes,value\r\n"North, East","Said ""review""\nrequired",12\r\nSouth,Ready,8');
  assert.deepEqual(rows, [
    { name: 'North, East', notes: 'Said "review"\nrequired', value: '12' },
    { name: 'South', notes: 'Ready', value: '8' }
  ]);
});

test('CSV parser makes duplicate and blank headers unique', () => {
  const rows = parseCSV('region,region,,amount\nNorth,West,East,12');
  assert.deepEqual(Object.keys(rows[0]), ['region', 'region_2', 'column_3', 'amount']);
});

test('CSV parser rejects unfinished quotes and inconsistent row widths', () => {
  assert.throws(() => parseCSV('name,value\n"North,12'), /unfinished quoted field/i);
  assert.throws(() => parseCSV('name,value\nNorth,1,extra'), /header contains 2/i);
});

test('sample retail CSV can create a correct monthly revenue trend', () => {
  const rows = parseCSV(retailCSV);
  const result = buildChartPoints(rows, { xKey: 'month', yKey: 'revenue_k', type: 'line', aggregation: 'sum' });
  assert.equal(rows.length, 24);
  assert.deepEqual(result.points.map(point => point.x), ['2025-01','2025-02','2025-03','2025-04','2025-05','2025-06']);
  assert.deepEqual(result.points.map(point => point.y), [124,130,136,136,149,160]);
  assert.equal(result.yLabel, 'Sum of revenue_k');
});

test('sample retail CSV can be aggregated to regional totals', () => {
  const rows = parseCSV(retailCSV);
  const result = buildChartPoints(rows, { xKey: 'region', yKey: 'revenue_k', type: 'bar', aggregation: 'sum' });
  const totals = Object.fromEntries(result.points.map(point => [point.x, point.y]));
  assert.deepEqual(totals, { North: 232, South: 180, East: 150, West: 273 });
});

test('mean and count aggregations are correct', () => {
  const rows = parseCSV('group,value\nA,10\nA,20\nB,5');
  const mean = buildChartPoints(rows, { xKey: 'group', yKey: 'value', type: 'bar', aggregation: 'mean' });
  const count = buildChartPoints(rows, { xKey: 'group', yKey: 'value', type: 'bar', aggregation: 'count' });
  assert.deepEqual(mean.points.map(point => point.y), [15,5]);
  assert.deepEqual(count.points.map(point => point.y), [2,1]);
});

test('scatter requires numeric x and no aggregation', () => {
  const rows = parseCSV('spend,orders\n10,20\n15,24');
  assert.equal(buildChartPoints(rows, { xKey: 'spend', yKey: 'orders', type: 'scatter', aggregation: 'none' }).points.length, 2);
  assert.throws(() => buildChartPoints(rows, { xKey: 'spend', yKey: 'orders', type: 'scatter', aggregation: 'sum' }), /individual observations/i);
  assert.throws(() => buildChartPoints(parseCSV('region,orders\nNorth,20'), { xKey: 'region', yKey: 'orders', type: 'scatter', aggregation: 'none' }), /numeric X column/i);
});

test('CSV download quoting preserves commas, quotes and newlines', () => {
  const csv = rowsToCSV(['region', 'note'], [['North, East', 'Said "yes"\nready']]);
  assert.deepEqual(parseCSV(csv), [{ region: 'North, East', note: 'Said "yes"\nready' }]);
});


test('line charts sort ISO date categories chronologically', () => {
  const rows = parseCSV('month,revenue\n2025-03,30\n2025-01,10\n2025-02,20');
  const result = buildChartPoints(rows, { xKey: 'month', yKey: 'revenue', type: 'line', aggregation: 'sum' });
  assert.deepEqual(result.points.map(point => point.x), ['2025-01','2025-02','2025-03']);
  assert.deepEqual(result.points.map(point => point.y), [10,20,30]);
});

test('spreadsheet-safe CSV exports neutralize formula-like text cells', () => {
  const csv = rowsToCSV(['region', 'value'], [['=HYPERLINK("https://example.test")', 1]], { spreadsheetSafe: true });
  assert.equal(parseCSV(csv)[0].region, "'=HYPERLINK(\"https://example.test\")");
});

test('series splitting creates one aggregated line per category', () => {
  const rows = parseCSV(retailCSV);
  const result = buildChartPoints(rows, {
    xKey: 'month', yKey: 'revenue_k', type: 'line', aggregation: 'sum', seriesKey: 'region'
  });
  assert.equal(result.points.length, 24);
  assert.deepEqual([...new Set(result.points.map(point => point.series))], ['North','South','East','West']);
  const north = result.points.filter(point => point.series === 'North');
  assert.deepEqual(north.map(point => point.y), [34,36,38,37,42,45]);
});

test('category filtering limits rows before aggregation', () => {
  const rows = parseCSV(retailCSV);
  const result = buildChartPoints(rows, {
    xKey: 'month', yKey: 'revenue_k', type: 'line', aggregation: 'sum', filterKey: 'region', filterValue: 'North'
  });
  assert.equal(result.filteredRows, 6);
  assert.equal(result.sourceRows, 24);
  assert.deepEqual(result.points.map(point => point.y), [34,36,38,37,42,45]);
});

test('series and filter columns cannot overwrite chart axes', () => {
  const rows = parseCSV('month,region,revenue\n2025-01,North,10');
  assert.throws(() => buildChartPoints(rows, { xKey: 'month', yKey: 'revenue', seriesKey: 'month' }), /different from the X and Y/i);
  assert.throws(() => buildChartPoints(rows, { xKey: 'month', yKey: 'revenue', filterKey: 'revenue', filterValue: '10' }), /different from the X and Y/i);
});

test('series categories are capped to keep multi-series charts readable', () => {
  const rows = parseCSV('month,series,value\n2025-01,A,1\n2025-01,B,2\n2025-01,C,3');
  const result = buildChartPoints(rows, { xKey: 'month', yKey: 'value', type: 'line', aggregation: 'sum', seriesKey: 'series' });
  assert.equal(new Set(result.points.map(point => point.series)).size, 3);
  const tooMany = parseCSV(`month,series,value\n${Array.from({length: 21}, (_, index) => `2025-01,S${index},${index + 1}`).join('\n')}`);
  assert.throws(() => buildChartPoints(tooMany, { xKey: 'month', yKey: 'value', type: 'line', aggregation: 'sum', seriesKey: 'series' }), /more than 20 categories/i);
});


test('CSV defaults select a numeric measure instead of blindly choosing the second column', async () => {
  const sample = await readFile(new URL('../datasets/retail_monthly.csv', import.meta.url), 'utf8');
  const rows = parseCSV(sample);
  assert.deepEqual(inferCSVDefaults(rows), {
    xKey: 'month', yKey: 'revenue_k', type: 'line', aggregation: 'sum'
  });
});

test('CSV defaults choose a categorical dimension and numeric measure', () => {
  const rows = [
    { product: 'A', region: 'North', sales: '12' },
    { product: 'B', region: 'South', sales: '16' }
  ];
  assert.deepEqual(inferCSVDefaults(rows), {
    xKey: 'product', yKey: 'sales', type: 'bar', aggregation: 'sum'
  });
});

test('CSV defaults choose a scatter plot when the dataset has two numeric measures only', () => {
  const rows = [{ spend: '12', orders: '8' }, { spend: '16', orders: '11' }];
  assert.deepEqual(inferCSVDefaults(rows), {
    xKey: 'spend', yKey: 'orders', type: 'scatter', aggregation: 'none'
  });
});

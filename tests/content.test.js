import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { navigation, lessons, getChartInfo, getSample, getCode } from '../assets/js/content.js';

const chartIds = ['bar','line','scatter','histogram','box','violin','area','heatmap','pie','treemap','sankey','dotplot','density','dotchart','bubble','gauge','balloon','mosaic','radar','sunburst','strip'];
const languages = ['R','Python · Pandas','Python · Polars','JavaScript'];

test('all navigation entries resolve to a lesson or chart lesson', () => {
  const ids = navigation.flatMap(group => group.items.map(item => item.id));
  assert.equal(new Set(ids).size, ids.length, 'navigation IDs should be unique');
  for (const id of ids) assert.ok(lessons[id] || getChartInfo(id), `missing content for ${id}`);
});

test('every chart lesson has explanations, sample data, references and four code variants', () => {
  for (const id of chartIds) {
    const info = getChartInfo(id);
    assert.ok(info, `missing chart description: ${id}`);
    assert.ok(info.purpose && info.when.length && info.avoid.length && info.mechanics, `incomplete explanation: ${id}`);
    assert.match(info.reference, /^https:\/\//, `missing source reference: ${id}`);
    assert.ok(getSample(id), `missing sample data: ${id}`);
    const variants = getCode(id);
    for (const language of languages) assert.ok(variants[language]?.trim(), `missing ${language} code for ${id}`);
  }
});


test('chart lessons use the chart name as their page title', () => {
  const expected = {
    bar: 'Bar chart', dotchart: 'Dot chart', line: 'Line chart', area: 'Area chart',
    scatter: 'Scatter plot', bubble: 'Bubble chart', balloon: 'Balloon plot', heatmap: 'Heatmap',
    histogram: 'Histogram', density: 'Density plot', dotplot: 'Dot plot', box: 'Box plot',
    violin: 'Violin plot', strip: 'Strip chart', pie: 'Pie chart', treemap: 'Treemap',
    sunburst: 'Sunburst chart', mosaic: 'Mosaic plot', gauge: 'Gauge chart', radar: 'Radar chart',
    sankey: 'Sankey diagram'
  };
  for (const [id, title] of Object.entries(expected)) assert.equal(getChartInfo(id).title, title);
});

test('strip-chart examples use supported deterministic jitter instead of an unsupported Plotly Express argument', () => {
  const examples = getCode('strip');
  assert.match(examples['Python · Pandas'], /groupby\("group"\)\.cumcount\(\)/);
  assert.match(examples['Python · Pandas'], /plotly\.graph_objects/);
  assert.doesNotMatch(examples['Python · Pandas'], /px\.strip|jitter=/);
  assert.match(examples['Python · Polars'], /x_positions/);
  assert.doesNotMatch(examples['Python · Polars'], /px\.strip|jitter=/);
});

test('curriculum covers the agreed learning areas', () => {
  for (const id of ['history','perception','color','typography','accessibility','decision','selection','data','audiences','narrative','misleading','practice','dataset-lab','implementation','sources']) {
    assert.ok(lessons[id], `missing curriculum topic: ${id}`);
    assert.ok(lessons[id].sections.length > 0, `empty lesson: ${id}`);
  }
});

test('box plot preview sample fields match the code examples', () => {
  const sample = getSample('box');
  assert.deepEqual(sample.a, [4,5,6,7]);
  assert.deepEqual(sample.b, [3,5,8,12]);
  for (const language of languages) assert.match(getCode('box')[language], /North|region/);
});

test('treemap hierarchy parent totals reconcile to their children', () => {
  const sample = getSample('treemap');
  const values = Object.fromEntries(sample.labels.map((label, index) => [label, sample.values[index]]));
  for (const parent of ['Retail','Digital','Services']) {
    const childrenTotal = sample.parents.reduce((total, candidate, index) => total + (candidate === parent ? sample.values[index] : 0), 0);
    assert.equal(values[parent], childrenTotal, `${parent} should equal the sum of its child nodes`);
  }
});

test('Sankey flow is balanced at intermediate stages', () => {
  const sample = getSample('sankey');
  const inflow = Array(sample.labels.length).fill(0);
  const outflow = Array(sample.labels.length).fill(0);
  sample.source.forEach((source, index) => {
    outflow[source] += sample.value[index];
    inflow[sample.target[index]] += sample.value[index];
  });
  assert.equal(outflow[0], 1000, 'all 1,000 initial cases should be assigned');
  assert.equal(inflow[1], outflow[1], 'review inflow should equal review outflow');
  assert.equal(inflow[2], outflow[2], 'approval inflow should equal approval outflow');
  assert.equal(inflow[3] + inflow[4], 1000, 'terminal states should account for all initial cases');
});

test('display preferences and current Plotly bundle are wired into both pages', async () => {
  const landing = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const learning = await readFile(new URL('../learn.html', import.meta.url), 'utf8');
  for (const page of [landing, learning]) {
    assert.match(page, /plotly-4\.2\.0\.min\.js/);
    assert.match(page, /data-theme-toggle/);
    assert.match(page, /data-font-scale/);
  }
});


test('JavaScript examples are syntactically valid and R examples use valid native pipes', () => {
  for (const id of chartIds) {
    const variants = getCode(id);
    assert.doesNotThrow(() => new Function(variants.JavaScript), `invalid JavaScript example: ${id}`);
    assert.match(variants.R, /library\(plotly\)/, `R example should load Plotly: ${id}`);
    assert.doesNotMatch(variants.R, /\|\s+>/, `R example contains a broken native pipe: ${id}`);
  }
});

test('dataset lab exposes labeled controls and the browser-local data notice', () => {
  const body = lessons['dataset-lab'].sections.map(section => section.body).join(' ');
  for (const id of ['csv-file','load-sample-dataset','x-column','y-column','series-column','filter-column','filter-value','data-palette','chart-type','aggregation','draw-uploaded-chart']) {
    assert.ok(body.includes(`id=\"${id}\"`), `missing dataset control: ${id}`);
  }
  assert.match(body, /not sent to a server/i);
});

test('the chart catalogue excludes a disabled legacy lesson and uses plain chart titles', async () => {
  const source = await readFile(new URL('../assets/js/app.js', import.meta.url), 'utf8');
  const navIds = navigation.flatMap(group => group.items.map(item => item.id));
  const disabledChartId = ['q', 'q'].join('');
  assert.equal(navIds.includes(disabledChartId), false);
  assert.equal(getChartInfo(disabledChartId), undefined);
  assert.match(source, /title: info\.title/);
  assert.match(source, /document\.title = `\$\{lesson\.title\} \| Viznova`/);
  for (const id of chartIds) {
    const title = getChartInfo(id).title;
    assert.doesNotMatch(title, /when and how|^\w+: /i);
  }
});

test('chart lesson previews expose manipulation controls and the Plotly modebar', async () => {
  const source = await readFile(new URL('../assets/js/app.js', import.meta.url), 'utf8');
  const charting = await readFile(new URL('../assets/js/charting.js', import.meta.url), 'utf8');
  assert.match(source, /renderChartControls\(id, optionsForChart\(id\)\)/);
  assert.match(source, /displayModeBar: true/);
  assert.match(source, /scrollZoom: true/);
  for (const option of ['sort','orientation','trendline','bins','boxPoints','showBox','fillOpacity','heatmapScale','hole','textMode','nodePadding','bandwidth','bubbleMaxSize','targetValue','showValues','labelMode','radialMax','jitter']) {
    assert.ok(charting.includes(`'${option}'`), `missing interactive chart option ${option}`);
  }
});


test('JavaScript examples create their own chart host and document Plotly.js requirement', () => {
  for (const id of chartIds) {
    const example = getCode(id).JavaScript;
    assert.match(example, /document\.createElement\('div'\)/, `missing chart host: ${id}`);
    assert.match(example, /Plotly\.newPlot\(chart,/, `Plotly should target the created element: ${id}`);
    assert.match(example, /plotly-4\.2\.0\.min\.js/, `missing Plotly.js setup reference: ${id}`);
    assert.doesNotThrow(() => new Function(example), `invalid JavaScript example: ${id}`);
  }
});

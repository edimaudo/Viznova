import test from 'node:test';
import assert from 'node:assert/strict';
import { getSample } from '../assets/js/content.js';
import { buildChartSpec, chartControls, chartPalettes, chartPalettesDark, defaultChartOptions, renderChartControls } from '../assets/js/charting.js';

const chartIds = ['bar','line','scatter','histogram','box','violin','area','heatmap','pie','treemap','sankey','dotplot','density','dotchart','bubble','gauge','balloon','mosaic','radar','sunburst','strip'];

test('every chart type has interactive settings and a renderable default specification', () => {
  for (const id of chartIds) {
    assert.ok(chartControls[id]?.length, `${id} should have chart-specific controls`);
    const spec = buildChartSpec(id, getSample(id), defaultChartOptions[id], 'light', 1);
    assert.ok(Array.isArray(spec.data) && spec.data.length, `${id} should produce a trace`);
    assert.ok(spec.layout && spec.layout.title, `${id} should provide a layout and title`);
  }
});

test('bar controls change ordering, orientation and data labels', () => {
  const sample = getSample('bar');
  const spec = buildChartSpec('bar', sample, { ...defaultChartOptions.bar, sort: 'ascending', orientation: 'horizontal', dataLabels: true });
  assert.equal(spec.data[0].orientation, 'h');
  assert.deepEqual(spec.data[0].y, ['East','South','North','West']);
  assert.deepEqual(spec.data[0].x, [22,27,34,41]);
  assert.deepEqual(spec.data[0].text, [22,27,34,41]);
});

test('line and scatter controls change marks, range selection and regression', () => {
  const line = buildChartSpec('line', getSample('line'), { ...defaultChartOptions.line, markers: false, lineShape: 'spline', lineWidth: 5 });
  assert.equal(line.data[0].mode, 'lines');
  assert.equal(line.data[0].line.width, 5);
  assert.equal(line.data[0].line.shape, 'spline');

  const scatter = buildChartSpec('scatter', getSample('scatter'), { ...defaultChartOptions.scatter, markerSize: 15, trendline: true });
  assert.equal(scatter.data.length, 2);
  assert.equal(scatter.data[0].marker.size, 15);
  assert.equal(scatter.data[1].name, 'Linear trend');
});

test('histogram, box and violin settings alter statistical detail', () => {
  const histogram = buildChartSpec('histogram', getSample('histogram'), { ...defaultChartOptions.histogram, bins: 12, normalization: 'probability' });
  assert.equal(histogram.data[0].nbinsx, 12);
  assert.equal(histogram.data[0].histnorm, 'probability');

  const box = buildChartSpec('box', getSample('box'), { ...defaultChartOptions.box, boxPoints: 'false' });
  assert.equal(box.data[0].boxpoints, false);

  const violin = buildChartSpec('violin', getSample('violin'), { ...defaultChartOptions.violin, showBox: false, showMean: false });
  assert.equal(violin.data[0].box.visible, false);
  assert.equal(violin.data[1].meanline.visible, false);
});

test('area, heatmap and composition charts expose meaningful encodings', () => {
  const area = buildChartSpec('area', getSample('area'), { ...defaultChartOptions.area, fillOpacity: 50, markers: true });
  assert.equal(area.data[0].mode, 'lines+markers');
  assert.match(area.data[0].fillcolor, /,0\.5\)/);

  const heatmap = buildChartSpec('heatmap', getSample('heatmap'), { ...defaultChartOptions.heatmap, heatmapScale: 'Cividis', cellLabels: true });
  assert.equal(heatmap.data[0].colorscale, 'Cividis');
  assert.equal(heatmap.data[0].text[0][0], '12');

  const pie = buildChartSpec('pie', getSample('pie'), { ...defaultChartOptions.pie, hole: 60, labelMode: 'percent' });
  assert.equal(pie.data[0].hole, 0.6);
  assert.equal(pie.data[0].textinfo, 'percent');

  const tree = buildChartSpec('treemap', getSample('treemap'), { ...defaultChartOptions.treemap, textMode: 'label' });
  assert.equal(tree.data[0].textinfo, 'label');
});

test('Sankey, gauge, mosaic and sunburst controls produce valid chart specifications', () => {
  const sankey = buildChartSpec('sankey', getSample('sankey'), { ...defaultChartOptions.sankey, nodePadding: 30, nodeThickness: 24 });
  assert.equal(sankey.data[0].node.pad, 30);
  assert.equal(sankey.data[0].node.thickness, 24);

  const gauge = buildChartSpec('gauge', getSample('gauge'), { ...defaultChartOptions.gauge, targetValue: 90, showDelta: false });
  assert.equal(gauge.data[0].type, 'indicator');
  assert.equal(gauge.data[0].gauge.threshold.value, 90);
  assert.equal(gauge.data[0].mode, 'gauge+number');

  const mosaic = buildChartSpec('mosaic', getSample('mosaic'), { ...defaultChartOptions.mosaic, labelMode: 'percent' });
  assert.equal(mosaic.layout.shapes.length, 6);
  assert.ok(mosaic.layout.annotations.length > 0);

  const sunburst = buildChartSpec('sunburst', getSample('sunburst'), defaultChartOptions.sunburst);
  assert.equal(sunburst.data[0].type, 'sunburst');
});

test('chart controls include keyboard-operable labeled inputs and reset behavior', () => {
  for (const id of chartIds) {
    const markup = renderChartControls(id, defaultChartOptions[id]);
    assert.match(markup, /data-reset-chart-options/);
    assert.match(markup, /Color palette/);
    assert.match(markup, /data-chart-option=/);
    assert.match(markup, /<label class="chart-control/);
  }
});

test('color palette choice changes the chart marks and dark theme remains explicit', () => {
  const blue = buildChartSpec('bar', getSample('bar'), { ...defaultChartOptions.bar, palette: 'blue' }, 'light');
  const accessible = buildChartSpec('bar', getSample('bar'), { ...defaultChartOptions.bar, palette: 'accessible' }, 'dark');
  assert.notEqual(blue.data[0].marker.color, accessible.data[0].marker.color);
  assert.equal(accessible.layout.paper_bgcolor, '#111b20');
});


function luminance(hex) {
  const channels = [0, 2, 4].map(index => parseInt(hex.slice(index + 1, index + 3), 16) / 255)
    .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}
function contrastRatio(left, right) {
  const [light, dark] = [luminance(left), luminance(right)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

test('light and dark chart palettes maintain at least 3:1 contrast against their plot backgrounds', () => {
  for (const [name, palette] of Object.entries(chartPalettes)) {
    for (const color of palette) assert.ok(contrastRatio(color, '#fbfbf8') >= 3, `${name} ${color} lacks light-theme chart contrast`);
  }
  for (const [name, palette] of Object.entries(chartPalettesDark)) {
    for (const color of palette) assert.ok(contrastRatio(color, '#111b20') >= 3, `${name} ${color} lacks dark-theme chart contrast`);
  }
});

test('Plotly layouts use the same theme surfaces and typography as the Viznova interface', () => {
  const light = buildChartSpec('line', getSample('line'), defaultChartOptions.line, 'light');
  const dark = buildChartSpec('line', getSample('line'), defaultChartOptions.line, 'dark');
  assert.equal(light.layout.paper_bgcolor, '#fbfbf8');
  assert.equal(light.layout.font.color, '#19272d');
  assert.equal(dark.layout.paper_bgcolor, '#111b20');
  assert.equal(dark.layout.font.color, '#edf3f1');
});


test('strip chart can turn jitter fully off and mosaic labels maintain contrast by theme', () => {
  const strip = buildChartSpec('strip', getSample('strip'), { ...defaultChartOptions.strip, jitter: 0 });
  assert.deepEqual(strip.data[0].x, [0,0,0,0,0,1,1,1,1,1,2,2,2,2,2]);
  const mosaicLight = buildChartSpec('mosaic', getSample('mosaic'), defaultChartOptions.mosaic, 'light');
  const mosaicDark = buildChartSpec('mosaic', getSample('mosaic'), defaultChartOptions.mosaic, 'dark');
  const tileLabelsLight = mosaicLight.layout.annotations.filter(item => item.text.includes('<br>'));
  const tileLabelsDark = mosaicDark.layout.annotations.filter(item => item.text.includes('<br>'));
  assert.ok(tileLabelsLight.every(item => item.font.color === '#ffffff'));
  assert.ok(tileLabelsDark.every(item => item.font.color === '#17212d'));
});

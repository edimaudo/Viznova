const control = (type, key, label, value, extra = {}) => ({ type, key, label, value, ...extra });

export const chartControls = {
  bar: [
    control('select', 'sort', 'Sort categories', 'original', { options: [['original', 'Original order'], ['ascending', 'Lowest first'], ['descending', 'Highest first']] }),
    control('select', 'orientation', 'Orientation', 'vertical', { options: [['vertical', 'Vertical'], ['horizontal', 'Horizontal']] }),
    control('checkbox', 'dataLabels', 'Show values on bars', true)
  ],
  line: [
    control('checkbox', 'markers', 'Show point markers', true),
    control('range', 'lineWidth', 'Line width', 3, { min: 1, max: 6, step: 1, unit: 'px' }),
    control('select', 'lineShape', 'Line interpolation', 'linear', { options: [['linear', 'Straight segments'], ['spline', 'Smoothed curve'], ['hv', 'Step: horizontal then vertical']] })
  ],
  scatter: [
    control('range', 'markerSize', 'Marker size', 10, { min: 5, max: 20, step: 1, unit: 'px' }),
    control('checkbox', 'trendline', 'Show linear trend line', false)
  ],
  histogram: [
    control('range', 'bins', 'Number of bins', 8, { min: 4, max: 20, step: 1 }),
    control('select', 'normalization', 'Y-axis measure', 'count', { options: [['count', 'Count'], ['probability', 'Probability'], ['density', 'Density']] })
  ],
  box: [
    control('select', 'boxPoints', 'Show observations', 'outliers', { options: [['outliers', 'Outliers only'], ['all', 'All observations'], ['false', 'Hide observations']] })
  ],
  violin: [
    control('checkbox', 'showBox', 'Show quartiles', true),
    control('checkbox', 'showMean', 'Show mean line', true)
  ],
  area: [
    control('range', 'fillOpacity', 'Area opacity', 22, { min: 5, max: 65, step: 5, unit: '%' }),
    control('checkbox', 'markers', 'Show point markers', false)
  ],
  heatmap: [
    control('select', 'heatmapScale', 'Color scale', 'Blues', { options: [['Blues', 'Blue'], ['Viridis', 'Viridis'], ['Cividis', 'Cividis (color-vision friendly)']] }),
    control('checkbox', 'cellLabels', 'Show cell values', false)
  ],
  pie: [
    control('range', 'hole', 'Donut hole', 35, { min: 0, max: 65, step: 5, unit: '%' }),
    control('select', 'labelMode', 'Labels', 'label+percent', { options: [['label+percent', 'Category and percentage'], ['label', 'Category'], ['percent', 'Percentage'], ['value', 'Value']] })
  ],
  treemap: [
    control('select', 'textMode', 'Tile labels', 'label+value', { options: [['label+value', 'Category and value'], ['label', 'Category'], ['value', 'Value']] })
  ],
  sankey: [
    control('range', 'nodePadding', 'Space between nodes', 18, { min: 8, max: 36, step: 2, unit: 'px' }),
    control('range', 'nodeThickness', 'Node thickness', 18, { min: 10, max: 34, step: 2, unit: 'px' })
  ],
  dotplot: [control('range', 'markerSize', 'Dot size', 12, { min: 6, max: 20, step: 1, unit: 'px' })],
  density: [control('range', 'bandwidth', 'Smoothing bandwidth', 0.55, { min: 0.2, max: 1.5, step: 0.05 })],
  dotchart: [
    control('select', 'sort', 'Sort categories', 'descending', { options: [['original', 'Original order'], ['ascending', 'Lowest first'], ['descending', 'Highest first']] }),
    control('range', 'markerSize', 'Dot size', 12, { min: 6, max: 20, step: 1, unit: 'px' }),
    control('checkbox', 'showLabels', 'Show values', true)
  ],
  bubble: [
    control('range', 'bubbleMaxSize', 'Maximum bubble size', 48, { min: 20, max: 70, step: 2, unit: 'px' }),
    control('checkbox', 'showLabels', 'Show campaign labels', false)
  ],
  gauge: [
    control('range', 'targetValue', 'Target value', 80, { min: 50, max: 100, step: 5 }),
    control('checkbox', 'showDelta', 'Show difference from target', true)
  ],
  balloon: [
    control('range', 'bubbleMaxSize', 'Maximum circle size', 48, { min: 20, max: 70, step: 2, unit: 'px' }),
    control('checkbox', 'showValues', 'Show counts', true)
  ],
  mosaic: [control('select', 'labelMode', 'Tile labels', 'count', { options: [['count', 'Counts'], ['percent', 'Within-group percentages'], ['none', 'No labels']] })],
  radar: [
    control('range', 'radialMax', 'Radial scale maximum', 100, { min: 50, max: 150, step: 10 }),
    control('range', 'fillOpacity', 'Area opacity', 22, { min: 5, max: 55, step: 5, unit: '%' })
  ],
  sunburst: [control('select', 'textMode', 'Segment labels', 'label+percent entry', { options: [['label+percent entry', 'Category and percentage'], ['label', 'Category'], ['value', 'Category and value']] })],
  strip: [
    control('range', 'jitter', 'Horizontal jitter', 0.18, { min: 0, max: 0.35, step: 0.01 }),
    control('range', 'markerSize', 'Point size', 10, { min: 5, max: 18, step: 1, unit: 'px' })
  ]
};

export const defaultChartOptions = Object.fromEntries(
  Object.entries(chartControls).map(([id, controls]) => [id, {
    palette: 'blue',
    ...Object.fromEntries(controls.map(item => [item.key, item.value]))
  }])
);

export const chartPalettes = {
  blue: ['#174e73', '#397e73', '#875500', '#74518c', '#b04b3d'],
  accessible: ['#0072B2', '#A66500', '#009E73', '#A64E82', '#D55E00'],
  warm: ['#8f3d32', '#bb7625', '#65733d', '#72598a', '#42677a']
};

export const chartPalettesDark = {
  blue: ['#8cc9ef', '#81c9b0', '#e8be73', '#c5a3e2', '#eb988b'],
  accessible: ['#56b4e9', '#f0c36d', '#56c7a4', '#e6a6ce', '#f28e52'],
  warm: ['#ee9a8d', '#e1a45c', '#adbd70', '#c3a6e1', '#8bbbd0']
};

function rgba(hex, alpha) {
  const value = hex.replace('#', '');
  const normalized = value.length === 3 ? value.split('').map(char => char + char).join('') : value;
  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${red},${green},${blue},${alpha})`;
}


function luminance(hex) {
  const value = hex.replace('#', '');
  const channels = [0, 2, 4].map(index => parseInt(value.slice(index, index + 2), 16) / 255)
    .map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastingText(hex) {
  const level = luminance(hex);
  const darkContrast = (level + 0.05) / 0.05;
  const lightContrast = 1.05 / (level + 0.05);
  return darkContrast >= lightContrast ? '#17212d' : '#ffffff';
}

function interpolateHex(left, right, ratio) {
  const a = left.replace('#', '');
  const b = right.replace('#', '');
  const channels = [0, 2, 4].map(index => {
    const start = parseInt(a.slice(index, index + 2), 16);
    const end = parseInt(b.slice(index, index + 2), 16);
    return Math.round(start + (end - start) * ratio).toString(16).padStart(2, '0');
  });
  return `#${channels.join('')}`;
}

function heatmapTextColors(matrix, scale) {
  const stops = {
    Blues: ['#f7fbff', '#6baed6', '#08306b'],
    Viridis: ['#440154', '#21918c', '#fde725'],
    Cividis: ['#00204c', '#7d7c78', '#fee838']
  }[scale] || ['#f7fbff', '#6baed6', '#08306b'];
  const values = matrix.flat();
  const min = Math.min(...values);
  const max = Math.max(...values);
  return matrix.map(row => row.map(value => {
    const ratio = min === max ? 0.5 : (value - min) / (max - min);
    const color = ratio <= 0.5
      ? interpolateHex(stops[0], stops[1], ratio * 2)
      : interpolateHex(stops[1], stops[2], (ratio - 0.5) * 2);
    return contrastingText(color);
  }));
}

function linearRegression(x, y) {
  const pairs = x.map((value, index) => [Number(value), Number(y[index])]).filter(([a, b]) => Number.isFinite(a) && Number.isFinite(b));
  if (pairs.length < 2) return null;
  const meanX = pairs.reduce((sum, pair) => sum + pair[0], 0) / pairs.length;
  const meanY = pairs.reduce((sum, pair) => sum + pair[1], 0) / pairs.length;
  const denominator = pairs.reduce((sum, pair) => sum + (pair[0] - meanX) ** 2, 0);
  if (denominator === 0) return null;
  const slope = pairs.reduce((sum, pair) => sum + (pair[0] - meanX) * (pair[1] - meanY), 0) / denominator;
  const intercept = meanY - slope * meanX;
  const minX = Math.min(...pairs.map(pair => pair[0]));
  const maxX = Math.max(...pairs.map(pair => pair[0]));
  return { x: [minX, maxX], y: [intercept + slope * minX, intercept + slope * maxX] };
}

function layoutBase(theme, scale) {
  const dark = theme === 'dark';
  const paper = dark ? '#111b20' : '#fbfbf8';
  const text = dark ? '#edf3f1' : '#19272d';
  const muted = dark ? '#bdcccd' : '#53636a';
  const grid = dark ? '#354b51' : '#d5dedb';
  return {
    autosize: true,
    height: Math.round(340 * scale),
    margin: { l: Math.round(62 * scale), r: Math.round(24 * scale), t: Math.round(46 * scale), b: Math.round(64 * scale) },
    paper_bgcolor: paper,
    plot_bgcolor: paper,
    font: { family: 'Inter, sans-serif', color: text, size: 12 * scale },
    xaxis: { gridcolor: grid, zerolinecolor: grid, tickfont: { color: muted, size: 11 * scale }, title: { font: { color: muted, size: 12 * scale } } },
    yaxis: { gridcolor: grid, zerolinecolor: grid, tickfont: { color: muted, size: 11 * scale }, title: { font: { color: muted, size: 12 * scale } } },
    legend: { font: { color: text, size: 11 * scale } },
    hoverlabel: { bgcolor: dark ? '#21353c' : '#ffffff', font: { color: text, family: 'Inter, sans-serif', size: 12 * scale } }
  };
}

function estimateDensity(values, bandwidth = 0.55, pointCount = 160) {
  const numbers = values.map(Number).filter(Number.isFinite);
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  const spread = Math.max(max - min, 1);
  const padding = spread * 0.08;
  const x = Array.from({ length: pointCount }, (_, index) => min - padding + (spread + padding * 2) * index / (pointCount - 1));
  const h = Math.max(Number(bandwidth) || 0.55, 0.05);
  const normalization = 1 / (numbers.length * h * Math.sqrt(2 * Math.PI));
  const y = x.map(position => numbers.reduce((sum, value) => sum + Math.exp(-0.5 * ((position - value) / h) ** 2), 0) * normalization);
  return { x, y };
}

function mosaicGeometry(sample, options, palette) {
  const total = sample.counts.flat().reduce((sum, value) => sum + value, 0);
  let left = 0;
  const shapes = [];
  const annotations = [];
  sample.groups.forEach((group, groupIndex) => {
    const row = sample.counts[groupIndex];
    const groupTotal = row.reduce((sum, value) => sum + value, 0);
    const width = groupTotal / total;
    let bottom = 0;
    row.forEach((count, segmentIndex) => {
      const height = count / groupTotal;
      shapes.push({ type: 'rect', xref: 'paper', yref: 'paper', x0: left, x1: left + width, y0: bottom, y1: bottom + height, line: { color: '#ffffff', width: 2 }, fillcolor: palette[segmentIndex % palette.length] });
      let label = '';
      if (options.labelMode === 'count') label = `${sample.segments[segmentIndex]}: ${count}`;
      if (options.labelMode === 'percent') label = `${sample.segments[segmentIndex]}: ${(height * 100).toFixed(0)}%`;
      if (label) annotations.push({ x: left + width / 2, y: bottom + height / 2, xref: 'paper', yref: 'paper', text: `${group}<br>${label}`, showarrow: false, font: { color: contrastingText(palette[segmentIndex % palette.length]), size: 10 }, align: 'center' });
      bottom += height;
    });
    annotations.push({ x: left + width / 2, y: 1.04, xref: 'paper', yref: 'paper', text: group, showarrow: false, font: { color: palette[0], size: 11 } });
    left += width;
  });
  return { shapes, annotations };
}

export function buildChartSpec(id, sample, options = {}, theme = 'light', scale = 1) {
  const dark = theme === 'dark';
  const paletteSet = dark ? chartPalettesDark : chartPalettes;
  const palette = paletteSet[options.palette] || paletteSet.blue;
  const [base, accent, third, fourth, fifth] = palette;
  const title = text => ({ text, font: { size: 15 * scale, color: dark ? '#edf3f1' : '#19272d' } });
  const layout = layoutBase(theme, scale);

  switch (id) {
    case 'bar': {
      let values = sample.x.map((label, index) => ({ label, value: sample.y[index] }));
      if (options.sort === 'ascending') values.sort((a, b) => a.value - b.value);
      if (options.sort === 'descending') values.sort((a, b) => b.value - a.value);
      const horizontal = options.orientation === 'horizontal';
      const trace = {
        type: 'bar',
        x: horizontal ? values.map(item => item.value) : values.map(item => item.label),
        y: horizontal ? values.map(item => item.label) : values.map(item => item.value),
        orientation: horizontal ? 'h' : 'v',
        marker: { color: base },
        text: options.dataLabels ? values.map(item => item.value) : undefined,
        textposition: options.dataLabels ? 'auto' : undefined,
        hovertemplate: horizontal ? '%{y}: %{x}<extra></extra>' : '%{x}: %{y}<extra></extra>'
      };
      return { data: [trace], layout: { ...layout, title: title('Revenue by region'), xaxis: { ...layout.xaxis, title: { text: horizontal ? 'Revenue ($k)' : 'Region' }, ...(horizontal ? { rangemode: 'tozero' } : {}) }, yaxis: { ...layout.yaxis, title: { text: horizontal ? 'Region' : 'Revenue ($k)' }, ...(!horizontal ? { rangemode: 'tozero' } : {}) } } };
    }
    case 'line':
      return {
        data: [{ type: 'scatter', mode: options.markers ? 'lines+markers' : 'lines', x: sample.x, y: sample.y, line: { color: base, width: Number(options.lineWidth) || 3, shape: options.lineShape || 'linear' }, marker: { size: 8 }, hovertemplate: '%{x}: %{y}<extra></extra>' }],
        layout: { ...layout, title: title('Monthly revenue trend'), xaxis: { ...layout.xaxis, title: { text: 'Month' } }, yaxis: { ...layout.yaxis, title: { text: 'Revenue ($k)' } } }
      };
    case 'scatter': {
      const data = [{ type: 'scatter', mode: 'markers', x: sample.x, y: sample.y, marker: { color: base, size: Number(options.markerSize) || 10, opacity: 0.78 }, hovertemplate: 'Spend: %{x}<br>Orders: %{y}<extra></extra>', name: 'Observations' }];
      const trend = options.trendline ? linearRegression(sample.x, sample.y) : null;
      if (trend) data.push({ type: 'scatter', mode: 'lines', x: trend.x, y: trend.y, line: { color: accent, width: 2, dash: 'dash' }, hoverinfo: 'skip', name: 'Linear trend' });
      return { data, layout: { ...layout, title: title('Advertising spend and orders'), xaxis: { ...layout.xaxis, title: { text: 'Advertising spend ($k)' } }, yaxis: { ...layout.yaxis, title: { text: 'Orders (hundreds)' } } } };
    }
    case 'histogram':
      return {
        data: [{ type: 'histogram', x: sample.x, nbinsx: Number(options.bins) || 8, histnorm: options.normalization === 'count' ? '' : options.normalization, marker: { color: base }, hovertemplate: 'Range: %{x}<br>Value: %{y}<extra></extra>' }],
        layout: { ...layout, title: title('Distribution of transaction values'), xaxis: { ...layout.xaxis, title: { text: 'Transaction value ($)' } }, yaxis: { ...layout.yaxis, title: { text: options.normalization === 'count' ? 'Count' : options.normalization === 'probability' ? 'Probability' : 'Density' } } }
      };
    case 'box':
      return {
        data: [
          { type: 'box', name: 'North', y: sample.a, boxpoints: options.boxPoints === 'false' ? false : options.boxPoints || 'outliers', marker: { color: base } },
          { type: 'box', name: 'South', y: sample.b, boxpoints: options.boxPoints === 'false' ? false : options.boxPoints || 'outliers', marker: { color: accent } }
        ],
        layout: { ...layout, title: title('Resolution time by region'), yaxis: { ...layout.yaxis, title: { text: 'Days' } }, boxmode: 'group' }
      };
    case 'violin':
      return {
        data: [
          { type: 'violin', name: 'A', y: sample.a, box: { visible: Boolean(options.showBox) }, meanline: { visible: Boolean(options.showMean) }, points: 'outliers', line: { color: base }, fillcolor: rgba(base, dark ? 0.24 : 0.16) },
          { type: 'violin', name: 'B', y: sample.b, box: { visible: Boolean(options.showBox) }, meanline: { visible: Boolean(options.showMean) }, points: 'outliers', line: { color: accent }, fillcolor: rgba(accent, dark ? 0.24 : 0.16) }
        ],
        layout: { ...layout, title: title('Distribution by group'), yaxis: { ...layout.yaxis, title: { text: 'Value' } }, violinmode: 'group' }
      };
    case 'area':
      return {
        data: [{ type: 'scatter', mode: options.markers ? 'lines+markers' : 'lines', x: sample.x, y: sample.y, fill: 'tozeroy', line: { color: base }, marker: { size: 7 }, fillcolor: rgba(base, (Number(options.fillOpacity) || 22) / 100), hovertemplate: '%{x}: %{y}<extra></extra>' }],
        layout: { ...layout, title: title('Monthly volume over time'), xaxis: { ...layout.xaxis, title: { text: 'Month' } }, yaxis: { ...layout.yaxis, title: { text: 'Volume' } } }
      };
    case 'heatmap':
      return {
        data: [{ type: 'heatmap', z: sample.z, x: sample.x, y: sample.y, colorscale: options.heatmapScale || 'Blues', text: options.cellLabels ? sample.z.map(row => row.map(value => String(value))) : undefined, texttemplate: options.cellLabels ? '%{text}' : undefined, textfont: { color: options.cellLabels ? heatmapTextColors(sample.z, options.heatmapScale || 'Blues') : (dark ? '#edf3f1' : '#19272d'), size: 10 * scale }, colorbar: { tickfont: { color: dark ? '#bac7d5' : '#596879', size: 10 * scale } }, hovertemplate: '%{y} · %{x}: %{z}<extra></extra>' }],
        layout: { ...layout, title: title('Activity by day and time'), xaxis: { ...layout.xaxis, title: { text: 'Time of day' } }, yaxis: { ...layout.yaxis, title: { text: 'Day' } } }
      };
    case 'pie':
      return {
        data: [{ type: 'pie', labels: sample.labels, values: sample.values, hole: (Number(options.hole) || 0) / 100, textinfo: options.labelMode || 'label+percent', textfont: { size: 11 * scale, color: [base, accent, third, fourth, fifth].slice(0, sample.labels.length).map(contrastingText) }, marker: { colors: [base, accent, third, fourth, fifth] } }],
        layout: { ...layout, title: title('Share of total by category'), showlegend: true }
      };
    case 'treemap':
      return {
        data: [{ type: 'treemap', labels: sample.labels, parents: sample.parents, values: sample.values, branchvalues: 'total', textinfo: options.textMode || 'label+value', textfont: { color: [base, accent, third, fourth, fifth, base, accent, third, fourth].slice(0, sample.labels.length).map(contrastingText), size: 11 * scale }, marker: { colors: [base, accent, third, fourth, fifth, base, accent, third, fourth] } }],
        layout: { ...layout, title: title('Contribution by business area') }
      };
    case 'dotplot':
      return { data: [{ type: 'scatter', mode: 'markers', x: sample.value, y: sample.stack, marker: { color: base, size: Number(options.markerSize) || 12 }, hovertemplate: 'Value: %{x}<br>Stack position: %{y}<extra></extra>' }], layout: { ...layout, title: title('Dot plot of observations'), xaxis: { ...layout.xaxis, title: { text: 'Value' } }, yaxis: { ...layout.yaxis, title: { text: 'Stack position' }, dtick: 1, rangemode: 'tozero' } } };
    case 'density': {
      const estimate = estimateDensity(sample.value, options.bandwidth || 0.55);
      return { data: [{ type: 'scatter', mode: 'lines', x: estimate.x, y: estimate.y, line: { color: base, width: 3 }, fill: 'tozeroy', fillcolor: rgba(base, dark ? 0.28 : 0.18), hovertemplate: 'Value: %{x:.2f}<br>Density: %{y:.3f}<extra></extra>' }], layout: { ...layout, title: title('Estimated distribution'), xaxis: { ...layout.xaxis, title: { text: 'Value' } }, yaxis: { ...layout.yaxis, title: { text: 'Density' }, rangemode: 'tozero' } } };
    }
    case 'dotchart': {
      const rows = sample.category.map((category, index) => ({ category, value: sample.value[index] }));
      if (options.sort === 'ascending') rows.sort((a,b) => a.value-b.value);
      if (options.sort === 'descending') rows.sort((a,b) => b.value-a.value);
      return { data: [{ type: 'scatter', mode: options.showLabels ? 'markers+text' : 'markers', x: rows.map(row => row.value), y: rows.map(row => row.category), text: options.showLabels ? rows.map(row => String(row.value)) : undefined, textposition: 'middle right', marker: { color: base, size: Number(options.markerSize) || 12 }, hovertemplate: '%{y}: %{x}<extra></extra>' }], layout: { ...layout, title: title('Values by category'), xaxis: { ...layout.xaxis, title: { text: 'Value' }, rangemode: 'tozero' }, yaxis: { ...layout.yaxis, title: { text: 'Category' }, categoryorder: 'array', categoryarray: rows.map(row => row.category) } } };
    }
    case 'bubble': {
      const maxSize = Number(options.bubbleMaxSize) || 48;
      const maxValue = Math.max(...sample.size);
      return { data: [{ type: 'scatter', mode: options.showLabels ? 'markers+text' : 'markers', x: sample.x, y: sample.y, text: options.showLabels ? sample.label : undefined, textposition: 'top center', name: 'Campaign', marker: { color: [base, accent, third, fourth, fifth, base], size: sample.size, sizemode: 'area', sizeref: 2 * maxValue / (maxSize ** 2), sizemin: 5, opacity: 0.82, line: { color: dark ? '#d7e4e8' : '#ffffff', width: 1 } }, customdata: sample.size, hovertemplate: '%{text}<br>Spend: %{x}<br>Conversions: %{y}<br>Audience: %{customdata}<extra></extra>' }], layout: { ...layout, title: title('Campaign performance'), xaxis: { ...layout.xaxis, title: { text: 'Spend ($k)' } }, yaxis: { ...layout.yaxis, title: { text: 'Conversions (hundreds)' } } } };
    }
    case 'gauge': {
      const target = Number(options.targetValue) || sample.target;
      return { data: [{ type: 'indicator', mode: options.showDelta ? 'gauge+number+delta' : 'gauge+number', value: sample.value, delta: { reference: target, position: 'bottom' }, title: { text: sample.label, font: { color: dark ? '#edf3f1' : '#19272d', size: 15 * scale } }, gauge: { axis: { range: [0, sample.max], tickfont: { color: dark ? '#bdcccd' : '#53636a' } }, bar: { color: base }, bgcolor: dark ? '#263942' : '#e5ece9', bordercolor: dark ? '#536b72' : '#c7d3ce', steps: [{ range: [0, target * 0.65], color: dark ? '#293a3c' : '#e8eeeb' }, { range: [target * 0.65, target], color: dark ? '#46513e' : '#f1ead9' }], threshold: { line: { color: accent, width: 4 }, thickness: 0.8, value: target } } }], layout: { ...layout, title: title('Performance against target'), margin: { l: 34, r: 34, t: 60, b: 24 } } };
    }
    case 'balloon': {
      const maxSize = Number(options.bubbleMaxSize) || 48;
      const maxValue = Math.max(...sample.count);
      return { data: [{ type: 'scatter', mode: options.showValues ? 'markers+text' : 'markers', x: sample.x, y: sample.y, text: options.showValues ? sample.count.map(String) : undefined, textposition: 'middle center', marker: { color: base, size: sample.count, sizemode: 'area', sizeref: 2 * maxValue / (maxSize ** 2), sizemin: 5, opacity: 0.82, line: { color: dark ? '#d7e4e8' : '#ffffff', width: 1 } }, customdata: sample.count, hovertemplate: '%{x}<br>%{y}: %{customdata}<extra></extra>' }], layout: { ...layout, title: title('Frequency by category'), xaxis: { ...layout.xaxis, title: { text: 'Channel' }, categoryorder: 'array', categoryarray: ['Web','Store','Partner'] }, yaxis: { ...layout.yaxis, title: { text: 'Customer cohort' }, categoryorder: 'array', categoryarray: ['New','Returning','Lapsed'] } } };
    }
    case 'mosaic': {
      const geometry = mosaicGeometry(sample, options, [base, accent, third, fourth, fifth]);
      return { data: [{ type: 'scatter', x: [0,1], y: [0,1], mode: 'markers', marker: { opacity: 0 }, hoverinfo: 'skip', showlegend: false }], layout: { ...layout, title: title('Customer mix by channel'), margin: { l: 10, r: 10, t: 58, b: 18 }, xaxis: { visible: false, range: [0,1], fixedrange: true }, yaxis: { visible: false, range: [0,1], fixedrange: true }, shapes: geometry.shapes, annotations: geometry.annotations } };
    }
    case 'radar': {
      const opacity = (Number(options.fillOpacity) || 22) / 100;
      return { data: [{ type: 'scatterpolar', r: sample.current, theta: sample.categories, fill: 'toself', name: 'Current', opacity: 0.92, line: { color: base }, fillcolor: rgba(base, opacity) }, { type: 'scatterpolar', r: sample.target, theta: sample.categories, fill: 'toself', name: 'Target', opacity: 0.8, line: { color: accent }, fillcolor: rgba(accent, opacity) }], layout: { ...layout, title: title('Service profile'), polar: { bgcolor: 'rgba(0,0,0,0)', radialaxis: { visible: true, range: [0, Number(options.radialMax) || 100], gridcolor: layout.xaxis.gridcolor, tickfont: { color: dark ? '#bdcccd' : '#53636a' } }, angularaxis: { gridcolor: layout.xaxis.gridcolor, tickfont: { color: layout.font.color } } } } };
    }
    case 'sunburst':
      return { data: [{ type: 'sunburst', labels: sample.labels, parents: sample.parents, values: sample.values, branchvalues: 'total', maxdepth: 3, insidetextorientation: 'auto', textinfo: options.textMode === 'label' ? 'label' : options.textMode === 'value' ? 'label+value' : 'label+percent parent', marker: { colors: [base, accent, third, fourth, fifth, base, accent, third, fourth, fifth], line: { color: dark ? '#17252a' : '#fbfbf8', width: 1 } }, hovertemplate: '%{label}<br>%{value}<extra></extra>' }], layout: { ...layout, title: title('Business contribution hierarchy') } };
    case 'strip': {
      const groups = [...new Set(sample.group)];
      const offsets = [0, -0.11, 0.11, -0.18, 0.18, -0.06, 0.06];
      const requestedJitter = Number(options.jitter);
      const jitter = Number.isFinite(requestedJitter) ? requestedJitter : 0.18;
      const x = sample.group.map((group, index) => groups.indexOf(group) + offsets[index % offsets.length] * (jitter / 0.18));
      return { data: [{ type: 'scatter', mode: 'markers', x, y: sample.value, text: sample.group, marker: { color: sample.group.map(group => palette[groups.indexOf(group) % palette.length]), size: Number(options.markerSize) || 10, opacity: 0.78 }, hovertemplate: '%{text}<br>Value: %{y}<extra></extra>' }], layout: { ...layout, title: title('Observations by group'), xaxis: { ...layout.xaxis, title: { text: 'Group' }, tickmode: 'array', tickvals: groups.map((_, index) => index), ticktext: groups, range: [-0.5, groups.length - 0.5] }, yaxis: { ...layout.yaxis, title: { text: 'Observed value' } } } };
    }
    case 'sankey':
      return { data: [{ type: 'sankey', node: { label: sample.labels, pad: Number(options.nodePadding) || 18, thickness: Number(options.nodeThickness) || 18, line: { color: dark ? '#39495a' : '#d5dde5', width: 1 }, color: [base, accent, third, fourth, fifth] }, link: { source: sample.source, target: sample.target, value: sample.value, color: rgba(base, dark ? 0.35 : 0.22) } }], layout: { ...layout, title: title('Movement through a process') } };
    default:
      return { data: [{ type: 'bar', x: ['A', 'B', 'C'], y: [46, 31, 23], marker: { color: base } }], layout };
  }
}

export function renderChartControls(id, options = {}) {
  const common = control('select', 'palette', 'Color palette', options.palette || 'blue', {
    options: [['blue', 'Blue and teal'], ['accessible', 'Colorblind-considerate'], ['warm', 'Warm']]
  });
  const controls = [common, ...(chartControls[id] || [])];
  return `<div class="chart-controls" aria-label="Chart settings"><div class="chart-controls-heading"><div><h3>Explore this chart</h3><p>Change the settings and observe how the visual changes.</p></div><button type="button" class="copy-button" data-reset-chart-options>Reset settings</button></div><div class="chart-control-grid">${controls.map(item => {
    const value = options[item.key] ?? item.value;
    if (item.type === 'checkbox') {
      return `<label class="chart-control chart-control-check"><input type="checkbox" data-chart-option="${item.key}" ${value ? 'checked' : ''}><span>${item.label}</span></label>`;
    }
    if (item.type === 'range') {
      return `<label class="chart-control"><span>${item.label} <output data-range-output="${item.key}">${value}${item.unit || ''}</output></span><input type="range" data-chart-option="${item.key}" min="${item.min}" max="${item.max}" step="${item.step}" value="${value}"></label>`;
    }
    return `<label class="chart-control"><span>${item.label}</span><select data-chart-option="${item.key}">${item.options.map(([optionValue, label]) => `<option value="${optionValue}" ${value === optionValue ? 'selected' : ''}>${label}</option>`).join('')}</select></label>`;
  }).join('')}</div></div>`;
}

import { navigation, lessons, getChartInfo, getSample, getCode } from './content.js?v=20261116-6';
import { parseCSV, buildChartPoints, rowsToCSV, inferCSVDefaults } from './csv.js?v=20261116-6';
import * as chartingModule from './charting.js?v=20261116-6';

const { buildChartSpec, chartPalettes, defaultChartOptions, renderChartControls } = chartingModule;
// Dark palettes were added after the first charting module version. Keep this as
// an optional namespace export so stale or older cached modules cannot prevent
// the entire learning application from loading.
const chartPalettesDark = chartingModule.chartPalettesDark || {
  blue: ['#8cc9ef', '#81c9b0', '#e8be73', '#c5a3e2', '#eb988b'],
  accessible: ['#56b4e9', '#f0c36d', '#56c7a4', '#e6a6ce', '#f28e52'],
  warm: ['#ee9a8d', '#e1a45c', '#adbd70', '#c3a6e1', '#8bbbd0']
};


const $ = (selector, root = document) => root.querySelector(selector);
const main = $('#lesson-content');
const lessonMain = $('#lesson-main');
const headerCurrentSection = $('#header-current-section');
const nav = $('#course-nav');
const outline = $('#lesson-outline-links');
let currentId = location.hash.slice(1) || 'start';
let uploadedRows = [];
let uploadedPoints = [];
let activeCodeLanguage = 'Python · Pandas';
let uploadedDataUrl = null;
let uploadedConfig = null;
const chartOptionState = Object.fromEntries(Object.entries(defaultChartOptions).map(([id, options]) => [id, { ...options }]));

function optionsForChart(id) {
  return chartOptionState[id] || (chartOptionState[id] = { ...defaultChartOptions[id] });
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function activeTheme() {
  return document.documentElement.dataset.theme || 'light';
}

function themeColors() {
  const dark = activeTheme() === 'dark';
  return {
    dark,
    paper: dark ? '#111b20' : '#fbfbf8',
    plot: dark ? '#111b20' : '#fbfbf8',
    text: dark ? '#edf3f1' : '#19272d',
    muted: dark ? '#bdcccd' : '#53636a',
    grid: dark ? '#354b51' : '#d5dedb',
    blue: dark ? '#8cc9ef' : '#145d70',
    teal: dark ? '#81c9b0' : '#397e73',
    gold: dark ? '#e8be73' : '#875500'
  };
}

function renderNav(filter = '') {
  const query = filter.trim().toLowerCase();
  const groups = navigation.map(group => {
    const items = group.items.filter(item => !query || `${item.title} ${group.title}`.toLowerCase().includes(query));
    if (!items.length) return '';
    return `<section class="nav-group"><h2>${esc(group.title)}</h2>${items.map(item => `
      <a class="nav-link ${item.id === currentId ? 'is-active' : ''}" href="#${esc(item.id)}" data-nav-id="${esc(item.id)}" ${item.id === currentId ? 'aria-current="page"' : ''}>${esc(item.title)}</a>`).join('')}
    </section>`;
  }).join('');
  nav.innerHTML = groups || '<p class="nav-empty">No matching lessons.</p>';
}

function renderOutline(sections) {
  outline.innerHTML = sections.map((section, index) => `<a href="#section-${index}">${esc(section.heading)}</a>`).join('');
}

function fontScale() {
  return Number(getComputedStyle(document.documentElement).getPropertyValue('--font-scale')) || 1;
}

function plotLayout() {
  const colors = themeColors();
  const scale = fontScale();
  return {
    autosize: true,
    height: Math.round(340 * scale),
    margin: { l: Math.round(62 * scale), r: Math.round(24 * scale), t: Math.round(46 * scale), b: Math.round(64 * scale) },
    paper_bgcolor: colors.paper,
    plot_bgcolor: colors.plot,
    font: { family: 'Inter, sans-serif', color: colors.text, size: 12 * scale },
    xaxis: {
      gridcolor: colors.grid,
      zerolinecolor: colors.grid,
      tickfont: { color: colors.muted, size: 11 * scale },
      title: { font: { color: colors.muted, size: 12 * scale } }
    },
    yaxis: {
      gridcolor: colors.grid,
      zerolinecolor: colors.grid,
      tickfont: { color: colors.muted, size: 11 * scale },
      title: { font: { color: colors.muted, size: 12 * scale } }
    },
    legend: { font: { color: colors.text, size: 11 * scale } },
    hoverlabel: {
      bgcolor: colors.dark ? '#263448' : '#ffffff',
      font: { color: colors.text, family: 'Inter, sans-serif', size: 12 * scale }
    }
  };
}

function renderChart(id, target) {
  if (!target) return;
  if (!window.Plotly) {
    target.textContent = 'The interactive chart could not load. Check your internet connection; the explanation, data table and code remain available.';
    target.classList.add('chart-fallback');
    return;
  }
  target.classList.remove('chart-fallback');
  const spec = buildChartSpec(id, getSample(id), optionsForChart(id), activeTheme(), fontScale());
  Plotly.react(target, spec.data, spec.layout, {
    responsive: true,
    displaylogo: false,
    displayModeBar: true,
    scrollZoom: true,
    doubleClick: 'reset',
    modeBarButtonsToRemove: ['toImage', 'sendDataToCloud']
  }).catch(() => {
    target.textContent = 'The chart could not be rendered. The sample data and implementation code are still available below.';
    target.classList.add('chart-fallback');
  });
}

function codePanel(id) {
  const code = getCode(id);
  const languages = ['R', 'Python · Pandas', 'Python · Polars', 'JavaScript'];
  activeCodeLanguage = languages.includes(activeCodeLanguage) ? activeCodeLanguage : 'Python · Pandas';
  const chosen = code[activeCodeLanguage] || code['Python · Pandas'];
  const setupNotes = {
    R: 'Requires the plotly R package and R 4.1 or later for the native pipe. Install with install.packages("plotly").',
    'Python · Pandas': 'Requires Plotly and pandas. Install with: python -m pip install plotly pandas numpy',
    'Python · Polars': 'Requires Plotly and Polars. Install with: python -m pip install plotly polars numpy. Plotly Express supports Polars DataFrames in Plotly.py 6 and later.',
    JavaScript: 'Load Plotly.js 4.2.0 first. This example creates its own chart container; no npm package or bundler is needed.'
  };
  const dependencyNote = id === 'density' && activeCodeLanguage.startsWith('Python') ? ' Density examples also use SciPy for the kernel density estimate.' : '';
  return `<p class="small-note implementation-note">${esc(setupNotes[activeCodeLanguage] + dependencyNote)}</p><div class="code-panel">
    <div class="code-toolbar">
      <div class="code-tabs" role="group" aria-label="Implementation language">${languages.map(language => `<button type="button" class="code-tab ${language === activeCodeLanguage ? 'is-active' : ''}" data-code-language="${esc(language)}" aria-pressed="${language === activeCodeLanguage}">${esc(language)}</button>`).join('')}</div>
      <button type="button" class="copy-button" data-copy-code>Copy code</button>
    </div>
    <pre><code id="chart-code">${esc(chosen)}</code></pre>
  </div>`;
}

function chartLesson(id) {
  const info = getChartInfo(id);
  const sample = getSample(id);
  let tableHeaders = ['Observation', 'Value'];
  let tableData = [];

  if (['bar', 'line', 'scatter', 'area'].includes(id)) {
    const columnLabels = {
      bar: ['Region', 'Revenue ($k)'],
      line: ['Month', 'Revenue ($k)'],
      scatter: ['Advertising spend ($k)', 'Orders (hundreds)'],
      area: ['Month', 'Volume'],
    };
    tableHeaders = columnLabels[id];
    tableData = sample.x.map((value, index) => [value, sample.y[index]]);
  } else if (id === 'histogram') {
    tableHeaders = ['Observation', 'Transaction value'];
    tableData = sample.x.map((value, index) => [index + 1, value]);
  } else if (id === 'box') {
    tableHeaders = ['Region', 'Resolution time (days)'];
    tableData = [...sample.a.map(value => ['North', value]), ...sample.b.map(value => ['South', value])];
  } else if (id === 'violin') {
    tableHeaders = ['Group', 'Value'];
    tableData = [...sample.a.map(value => ['A', value]), ...sample.b.map(value => ['B', value])];
  } else if (id === 'pie') {
    tableHeaders = ['Category', 'Share'];
    tableData = sample.labels.map((value, index) => [value, sample.values[index]]);
  } else if (id === 'treemap') {
    tableHeaders = ['Branch', 'Value'];
    tableData = sample.labels.map((value, index) => [`${sample.parents[index] || 'Root'} / ${value}`, sample.values[index]]);
  } else if (id === 'sankey') {
    tableHeaders = ['Flow', 'Value'];
    tableData = sample.source.map((value, index) => [`${sample.labels[value]} → ${sample.labels[sample.target[index]]}`, sample.value[index]]);
  } else if (id === 'heatmap') {
    tableHeaders = ['Day', ...sample.x];
    tableData = sample.y.map((day, index) => [day, ...sample.z[index]]);
  } else if (id === 'dotplot') {
    tableHeaders = ['Value', 'Stack position'];
    tableData = sample.value.map((value, index) => [value, sample.stack[index]]);
  } else if (id === 'density') {
    tableHeaders = ['Observed value'];
    tableData = sample.value.map(value => [value]);
  } else if (id === 'dotchart') {
    tableHeaders = ['Category', 'Value'];
    tableData = sample.category.map((category, index) => [category, sample.value[index]]);
  } else if (id === 'bubble') {
    tableHeaders = ['Campaign', 'Spend ($k)', 'Conversions (hundreds)', 'Audience'];
    tableData = sample.label.map((label, index) => [label, sample.x[index], sample.y[index], sample.size[index]]);
  } else if (id === 'gauge') {
    tableHeaders = ['Metric', 'Current value', 'Target', 'Maximum'];
    tableData = [[sample.label, sample.value, sample.target, sample.max]];
  } else if (id === 'balloon') {
    tableHeaders = ['Channel', 'Customer cohort', 'Count'];
    tableData = sample.x.map((channel, index) => [channel, sample.y[index], sample.count[index]]);
  } else if (id === 'mosaic') {
    tableHeaders = ['Channel', ...sample.segments, 'Total'];
    tableData = sample.groups.map((group, index) => [group, ...sample.counts[index], sample.counts[index].reduce((sum, value) => sum + value, 0)]);
  } else if (id === 'radar') {
    tableHeaders = ['Dimension', 'Current', 'Target'];
    tableData = sample.categories.map((category, index) => [category, sample.current[index], sample.target[index]]);
  } else if (id === 'sunburst') {
    tableHeaders = ['Category', 'Parent', 'Value'];
    tableData = sample.labels.map((label, index) => [label, sample.parents[index] || 'None', sample.values[index]]);
  } else if (id === 'strip') {
    tableHeaders = ['Group', 'Observation'];
    tableData = sample.group.map((group, index) => [group, sample.value[index]]);
  }

  const table = `<div class="table-scroll"><table><caption>Underlying sample values</caption><thead><tr>${tableHeaders.map(header => `<th scope="col">${esc(header)}</th>`).join('')}</tr></thead><tbody>${tableData.map(row => `<tr>${row.map(value => `<td>${esc(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const messageParts = info.message.split(' Business:');
  const technicalMessage = messageParts[0].replace('Technical: ', '').trim();
  const businessMessage = (messageParts[1] || 'Explain the finding, its scale and its practical implication.').trim();
  const sections = [
    { heading: 'What it communicates', body: `<p>${esc(info.purpose)}</p>` },
    { heading: 'When to use it', body: `<ul>${info.when.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` },
    { heading: 'When to choose another chart', body: `<ul>${info.avoid.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` },
    { heading: 'How it works', body: `<p>${esc(info.mechanics)}</p>` },
    { heading: 'Design checklist', body: `<ul>${info.design.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` },
    { heading: 'Communicate the result', body: `<div class="audience-comparison"><article><h3>Technical</h3><p>${esc(technicalMessage)}</p></article><article><h3>Business</h3><p>${esc(businessMessage)}</p></article></div>` },
    { heading: 'Sample data', body: table },
    { heading: 'Implementation', body: codePanel(id) },
    { heading: 'Common mistakes', body: `<ul>${info.mistakes.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` },
    { heading: 'Plotly documentation', body: `<p><a class="inline-link" href="${esc(info.reference)}" target="_blank" rel="noopener">Open the Plotly documentation ↗</a></p>` }
  ];
  return {
    title: info.title,
    section: 'Chart library',
    summary: info.summary,
    sections,
    next: 'practice'
  };
}

function renderLesson(id, { scroll = false } = {}) {
  if (!lessons[id] && !getChartInfo(id)) id = 'start';
  currentId = id;
  const lesson = lessons[id] || chartLesson(id);
  const chartInfo = getChartInfo(id);
  document.title = `${lesson.title} | Viznova`;
  if (headerCurrentSection) headerCurrentSection.textContent = lesson.section || 'Learning';

  const chartPreview = chartInfo ? `
    <section class="chart-lesson-preview" aria-labelledby="chart-preview-heading">
      <div class="chart-preview-heading">
        <div><h2 id="chart-preview-heading">Interactive chart preview</h2><p id="chart-preview-description">${esc(chartInfo.purpose)} Hover to inspect values. Use the toolbar to zoom, pan, select and reset. The settings change this live preview; the code lesson below shows baseline implementations. Underlying values are in the sample-data table.</p></div>
        <button type="button" class="copy-button" data-download-chart>Download PNG</button>
      </div>
      ${renderChartControls(id, optionsForChart(id))}
      <div id="lesson-chart" class="lesson-chart" role="group" aria-label="Interactive ${esc(id)} chart preview" aria-describedby="chart-preview-description"></div>
    </section>` : '';

  main.innerHTML = `<article class="lesson-article">
    <header class="lesson-header"><h1>${esc(lesson.title)}</h1><p class="lesson-summary">${esc(lesson.summary)}</p></header>
    ${chartPreview}
    <div class="lesson-sections">${lesson.sections.map((section, index) => `<section class="lesson-section" id="section-${index}"><h2>${esc(section.heading)}</h2>${section.body}</section>`).join('')}</div>
  </article>`;

  renderNav($('#lesson-search').value);
  renderOutline(lesson.sections);
  if (chartInfo) renderChart(id, $('#lesson-chart'));
  if (id === 'dataset-lab') bindCsvLab();
  $('#app-announcer').textContent = `${lesson.title} loaded`;
  lessonMain?.focus({ preventScroll: true });
  if (scroll) window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

function updateUploadedDataTable(xKey, yKey, points, seriesKey = '') {
  const tableHost = $('#uploaded-data-table');
  if (!tableHost) return;
  const visible = points.slice(0, 100);
  const headers = seriesKey ? [seriesKey, xKey, yKey] : [xKey, yKey];
  const more = points.length > visible.length ? `<p class="small-note">Showing the first 100 plotted rows. Download the complete plotted data below.</p>` : '';
  tableHost.innerHTML = `${more}<div class="table-scroll"><table><caption>Data used in the chart</caption><thead><tr>${headers.map(header => `<th scope="col">${esc(header)}</th>`).join('')}</tr></thead><tbody>${visible.map(point => `<tr>${(seriesKey ? [point.series, point.x, point.y] : [point.x, point.y]).map(value => `<td>${esc(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function drawUploadedChart() {
  if (!uploadedPoints.length || !uploadedConfig) return;
  const { xKey, yLabel, type, seriesKey, palette, filterKey, filterValue } = uploadedConfig;
  const points = uploadedPoints;
  const colors = themeColors();
  const paletteSet = colors.dark ? chartPalettesDark : chartPalettes;
  const paletteColors = paletteSet[palette] || paletteSet.blue;
  const seriesMap = new Map();
  points.forEach(point => {
    const key = seriesKey ? point.series : '__all__';
    if (!seriesMap.has(key)) seriesMap.set(key, []);
    seriesMap.get(key).push(point);
  });
  const seriesNames = [...seriesMap.keys()];
  const traces = seriesNames.map((seriesName, index) => {
    const rows = seriesMap.get(seriesName);
    const x = rows.map(point => point.x);
    const y = rows.map(point => point.y);
    const color = paletteColors[index % paletteColors.length];
    const name = seriesKey ? seriesName : yLabel;
    if (type === 'scatter') {
      return { type: 'scatter', mode: 'markers', x, y, name, marker: { color, size: 9, opacity: 0.82 }, hovertemplate: `${seriesKey ? `${esc(seriesName)}<br>` : ''}%{x}: %{y}<extra></extra>` };
    }
    if (type === 'line') {
      return { type: 'scatter', mode: 'lines+markers', x, y, name, line: { color, width: 3 }, marker: { size: 7 }, hovertemplate: `${seriesKey ? `${esc(seriesName)}<br>` : ''}%{x}: %{y}<extra></extra>` };
    }
    return { type: 'bar', x, y, name, marker: { color }, hovertemplate: `${seriesKey ? `${esc(seriesName)}<br>` : ''}%{x}: %{y}<extra></extra>` };
  });
  const allY = points.map(point => point.y);
  const min = Math.min(...allY);
  const max = Math.max(...allY);
  const filterDescription = filterKey && filterValue !== '__all__' ? ` Filter: ${filterKey} = ${filterValue}.` : '';
  const seriesDescription = seriesKey ? ` Split into ${seriesNames.length} series by ${seriesKey}.` : '';
  const description = `${type[0].toUpperCase() + type.slice(1)} chart with ${points.length.toLocaleString()} plotted observations. ${xKey} is on the horizontal axis and ${yLabel} is on the vertical axis. Values range from ${min} to ${max}.${seriesDescription}${filterDescription}`;
  $('#uploaded-chart-description').textContent = description;
  $('#uploaded-chart').hidden = false;
  $('#uploaded-chart-heading').hidden = false;
  $('#uploaded-chart').setAttribute('aria-describedby', 'uploaded-chart-description');
  updateUploadedDataTable(xKey, yLabel, points, seriesKey);

  if (!window.Plotly) {
    $('#uploaded-chart').textContent = 'The chart renderer could not load. The plotted data table is still available.';
    return;
  }
  Plotly.react($('#uploaded-chart'), traces, {
    ...plotLayout(),
    title: { text: `${yLabel} by ${xKey}`, font: { color: colors.text, size: 15 * fontScale() } },
    xaxis: { ...plotLayout().xaxis, title: { text: xKey } },
    yaxis: { ...plotLayout().yaxis, title: { text: yLabel }, ...(type === 'bar' ? { rangemode: 'tozero' } : {}) },
    barmode: seriesKey ? 'group' : 'relative',
    showlegend: Boolean(seriesKey)
  }, { responsive: true, displaylogo: false, displayModeBar: true, scrollZoom: true, doubleClick: 'reset', modeBarButtonsToRemove: ['toImage', 'sendDataToCloud'] }).catch(() => {
    $('#uploaded-chart').textContent = 'The chart could not be rendered. The plotted data table is still available.';
  });
}

function refreshFilterValues() {
  const filterColumn = $('#filter-column');
  const valueWrap = $('#filter-value-wrap');
  const valueControl = $('#filter-value');
  if (!filterColumn || !valueWrap || !valueControl) return;
  const selectedColumn = filterColumn.value;
  if (!selectedColumn) {
    valueWrap.hidden = true;
    valueControl.innerHTML = '<option value="__all__">All values</option>';
    return;
  }
  const priorValue = valueControl.value;
  const values = [...new Set(uploadedRows.map(row => String(row[selectedColumn] ?? '').trim()).filter(Boolean))]
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
  valueControl.innerHTML = `<option value="__all__">All values</option>${values.map(value => `<option value="${esc(value)}">${esc(value)}</option>`).join('')}`;
  valueControl.value = values.includes(priorValue) ? priorValue : '__all__';
  valueWrap.hidden = false;
}

function validateDatasetControlColumns() {
  const xKey = $('#x-column').value;
  const yKey = $('#y-column').value;
  const seriesSelect = $('#series-column');
  if ([xKey, yKey].includes(seriesSelect.value)) seriesSelect.value = '';
  const seriesKey = seriesSelect.value;
  [...seriesSelect.options].forEach(option => {
    option.disabled = option.value !== '' && [xKey, yKey].includes(option.value);
  });
  const filterSelect = $('#filter-column');
  if ([xKey, yKey].includes(filterSelect.value)) filterSelect.value = '';
  [...filterSelect.options].forEach(option => {
    option.disabled = option.value !== '' && [xKey, yKey].includes(option.value);
  });
  refreshFilterValues();
}

function bindCsvLab() {
  const fileInput = $('#csv-file');
  if (!fileInput) return;

  const clearPreviousResult = () => {
    uploadedRows = [];
    uploadedPoints = [];
    uploadedConfig = null;
    $('#dataset-controls').hidden = true;
    $('#uploaded-preview').innerHTML = '';
    $('#uploaded-data-table').innerHTML = '';
    $('#uploaded-data-download').hidden = true;
    $('#uploaded-data-download').removeAttribute('href');
    $('#download-uploaded-chart').hidden = true;
    $('#uploaded-chart').textContent = '';
    $('#uploaded-chart').hidden = true;
    $('#uploaded-chart-heading').hidden = true;
    $('#uploaded-chart-description').textContent = '';
    if (uploadedDataUrl) {
      URL.revokeObjectURL(uploadedDataUrl);
      uploadedDataUrl = null;
    }
  };

  const populateCSV = (text, filename, { sample = false } = {}) => {
    const status = $('#upload-status');
    clearPreviousResult();
    try {
      uploadedRows = parseCSV(text);
      const columns = Object.keys(uploadedRows[0]);
      ['#x-column', '#y-column'].forEach(selector => {
        const control = $(selector);
        control.innerHTML = columns.map(column => `<option value="${esc(column)}">${esc(column)}</option>`).join('');
      });
      $('#series-column').innerHTML = `<option value="">No split</option>${columns.map(column => `<option value="${esc(column)}">${esc(column)}</option>`).join('')}`;
      $('#series-column').value = '';
      $('#filter-column').innerHTML = `<option value="">No filter</option>${columns.map(column => `<option value="${esc(column)}">${esc(column)}</option>`).join('')}`;
      $('#filter-column').value = '';
      $('#filter-value-wrap').hidden = true;
      $('#filter-value').innerHTML = '<option value="__all__">All values</option>';
      $('#dataset-controls').hidden = false;
      const inferred = inferCSVDefaults(uploadedRows);
      if (inferred?.xKey && inferred?.yKey) {
        $('#x-column').value = inferred.xKey;
        $('#y-column').value = inferred.yKey;
        $('#chart-type').value = inferred.type;
        $('#aggregation').value = inferred.aggregation;
      } else {
        $('#chart-type').value = 'bar';
        $('#aggregation').value = 'sum';
      }
      // Preserve a predictable default for the bundled teaching dataset.
      if (sample && columns.includes('month') && columns.includes('revenue_k')) {
        $('#x-column').value = 'month';
        $('#y-column').value = 'revenue_k';
        $('#chart-type').value = 'line';
        $('#aggregation').value = 'sum';
      }
      $('#aggregation').disabled = $('#chart-type').value === 'scatter';
      validateDatasetControlColumns();
      $('#uploaded-preview').innerHTML = `<p><strong>${uploadedRows.length.toLocaleString()} rows</strong> · ${columns.length} columns · ${esc(filename)}</p><div class="table-scroll"><table><caption>CSV preview (first five rows)</caption><thead><tr>${columns.slice(0, 6).map(column => `<th scope="col">${esc(column)}</th>`).join('')}</tr></thead><tbody>${uploadedRows.slice(0, 5).map(record => `<tr>${columns.slice(0, 6).map(column => `<td>${esc(record[column])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      status.textContent = sample
        ? 'Sample retail data loaded. The default chart shows monthly revenue totals. Change the columns, split into series or filter categories to explore other questions.'
        : 'CSV loaded locally in this browser. No file data was sent to a server.';
      return true;
    } catch (error) {
      uploadedRows = [];
      status.textContent = error.message || 'The CSV could not be read.';
      return false;
    }
  };

  fileInput.addEventListener('change', async () => {
    const selected = fileInput.files?.[0];
    if (!selected) return;
    const status = $('#upload-status');
    clearPreviousResult();
    try {
      if (!selected.name.toLowerCase().endsWith('.csv')) throw new Error('Choose a file with a .csv extension.');
      if (selected.size > 5 * 1024 * 1024) throw new Error('Please select a CSV smaller than 5 MB.');
      const contents = await selected.text();
      populateCSV(contents, selected.name);
    } catch (error) {
      status.textContent = error.message || 'The CSV could not be read.';
    } finally {
      // Allow the same file to be selected again after a correction or reset.
      fileInput.value = '';
    }
  });

  $('#load-sample-dataset')?.addEventListener('click', async event => {
    const button = event.currentTarget;
    const status = $('#upload-status');
    button.disabled = true;
    status.textContent = 'Loading the sample retail dataset…';
    try {
      const url = new URL('datasets/retail_monthly.csv', window.location.href);
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Sample dataset could not be loaded (HTTP ${response.status}).`);
      const text = await response.text();
      populateCSV(text, 'retail_monthly.csv', { sample: true });
    } catch (error) {
      status.textContent = error.message || 'Sample dataset could not be loaded.';
    } finally {
      button.disabled = false;
    }
  });

  $('#chart-type')?.addEventListener('change', () => {
    const aggregation = $('#aggregation');
    if ($('#chart-type').value === 'scatter') {
      aggregation.value = 'none';
      aggregation.disabled = true;
    } else {
      aggregation.disabled = false;
      if (aggregation.value === 'none') aggregation.value = 'sum';
    }
  });

  ['#x-column', '#y-column', '#series-column'].forEach(selector => {
    $(selector)?.addEventListener('change', validateDatasetControlColumns);
  });
  $('#filter-column')?.addEventListener('change', refreshFilterValues);

  $('#draw-uploaded-chart')?.addEventListener('click', () => {
    if (!uploadedRows.length) return;
    const xKey = $('#x-column').value;
    const yKey = $('#y-column').value;
    const type = $('#chart-type').value;
    const aggregation = $('#aggregation').value;
    try {
      const seriesKey = $('#series-column').value;
      const filterKey = $('#filter-column').value;
      const filterValue = $('#filter-value').value;
      const palette = $('#data-palette').value;
      const result = buildChartPoints(uploadedRows, { xKey, yKey, type, aggregation, seriesKey, filterKey, filterValue });
      uploadedPoints = result.points;
      uploadedConfig = { xKey, yLabel: result.yLabel, type, seriesKey, palette, filterKey, filterValue };
      const missingNote = result.missing ? ` ${result.missing.toLocaleString()} rows with blank values were excluded.` : '';
      const filteredNote = result.filteredRows < result.sourceRows ? ` ${result.sourceRows - result.filteredRows} rows were removed by the filter.` : '';
      const aggregationNote = aggregation === 'none' ? 'No aggregation was applied.' : `${aggregation[0].toUpperCase() + aggregation.slice(1)} was calculated for each ${xKey}${seriesKey ? ` and ${seriesKey}` : ''} group.`;
      const seriesNote = seriesKey ? ` Split into series by ${seriesKey}.` : '';
      $('#upload-status').textContent = `Chart created from ${result.plottedRows.toLocaleString()} plotted ${result.plottedRows === 1 ? 'observation' : 'observations'} using ${result.filteredRows.toLocaleString()} selected source rows. ${aggregationNote}${seriesNote}${filteredNote}${missingNote} Data remains in this browser.`;
      const dataRows = uploadedPoints.map(point => seriesKey ? [point.series, point.x, point.y] : [point.x, point.y]);
      const exportHeaders = seriesKey ? [seriesKey, xKey, result.yLabel] : [xKey, result.yLabel];
      if (uploadedDataUrl) URL.revokeObjectURL(uploadedDataUrl);
      uploadedDataUrl = URL.createObjectURL(new Blob([rowsToCSV(exportHeaders, dataRows, { spreadsheetSafe: true })], { type: 'text/csv;charset=utf-8' }));
      $('#uploaded-data-download').href = uploadedDataUrl;
      $('#uploaded-data-download').hidden = false;
      $('#download-uploaded-chart').hidden = false;
      drawUploadedChart();
    } catch (error) {
      $('#upload-status').textContent = error.message || 'The chart could not be created from these columns.';
    }
  });

  $('#download-uploaded-chart')?.addEventListener('click', async () => {
    try {
      if (!window.Plotly || !$('#uploaded-chart')?.data) throw new Error('Chart unavailable');
      await Plotly.downloadImage($('#uploaded-chart'), { format: 'png', filename: 'viznova-uploaded-chart', scale: 2 });
      $('#upload-status').textContent = 'Chart image exported.';
    } catch {
      $('#upload-status').textContent = 'Chart image export is unavailable because the chart did not render.';
    }
  });
}

nav.addEventListener('click', event => {
  const link = event.target.closest('[data-nav-id]');
  if (link) {
    event.preventDefault();
    location.hash = link.dataset.navId;
  }
});

outline.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#section-"]');
  if (link) {
    event.preventDefault();
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
});

$('#lesson-search').addEventListener('input', event => renderNav(event.target.value));

function updateChartOption(control) {
  const key = control.dataset.chartOption;
  if (!key || !getChartInfo(currentId)) return;
  const value = control.type === 'checkbox' ? control.checked
    : control.type === 'range' ? Number(control.value) : control.value;
  optionsForChart(currentId)[key] = value;
  const output = main.querySelector(`[data-range-output="${key}"]`);
  if (output) {
    const suffix = key === 'lineWidth' || key === 'markerSize' || key === 'nodePadding' || key === 'nodeThickness' ? 'px' : key === 'fillOpacity' || key === 'hole' ? '%' : '';
    output.textContent = `${value}${suffix}`;
  }
  renderChart(currentId, $('#lesson-chart'));
  $('#app-announcer').textContent = `Chart updated: ${key.replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`)} changed.`;
}

main.addEventListener('input', event => {
  const control = event.target.closest('[data-chart-option]');
  if (control?.type === 'range') updateChartOption(control);
});

main.addEventListener('change', event => {
  const control = event.target.closest('[data-chart-option]');
  if (control && control.type !== 'range') updateChartOption(control);
});

main.addEventListener('click', event => {
  const reset = event.target.closest('[data-reset-chart-options]');
  if (!reset) return;
  chartOptionState[currentId] = { ...defaultChartOptions[currentId] };
  const holder = reset.closest('.chart-lesson-preview');
  const controls = holder?.querySelector('.chart-controls');
  if (controls) controls.outerHTML = renderChartControls(currentId, optionsForChart(currentId));
  renderChart(currentId, $('#lesson-chart'));
  $('#app-announcer').textContent = 'Chart settings reset to their defaults.';
});

main.addEventListener('click', async event => {
  const codeTab = event.target.closest('[data-code-language]');
  if (codeTab) {
    activeCodeLanguage = codeTab.dataset.codeLanguage;
    const selectedLanguage = activeCodeLanguage;
    renderLesson(currentId);
    const selectedTab = [...main.querySelectorAll('[data-code-language]')]
      .find(button => button.dataset.codeLanguage === selectedLanguage);
    selectedTab?.focus({ preventScroll: true });
    $('#section-7')?.scrollIntoView({ block: 'start' });
    return;
  }
  const copyButton = event.target.closest('[data-copy-code]');
  if (copyButton) {
    const code = $('#chart-code')?.textContent || '';
    try {
      await navigator.clipboard.writeText(code);
      copyButton.textContent = 'Copied';
      setTimeout(() => { if (copyButton.isConnected) copyButton.textContent = 'Copy code'; }, 1300);
    } catch {
      const codeElement = $('#chart-code');
      if (codeElement) {
        const range = document.createRange();
        range.selectNodeContents(codeElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
      copyButton.textContent = 'Code selected ,  copy it';
    }
    return;
  }
  const downloadButton = event.target.closest('[data-download-chart]');
  if (downloadButton) {
    const chart = $('#lesson-chart');
    if (!window.Plotly || !chart?.data) {
      downloadButton.textContent = 'Chart unavailable';
      return;
    }
    try {
      await Plotly.downloadImage(chart, { format: 'png', filename: `viznova-${currentId}`, scale: 2 });
      downloadButton.textContent = 'Downloaded';
      setTimeout(() => { if (downloadButton.isConnected) downloadButton.textContent = 'Download PNG'; }, 1300);
    } catch {
      downloadButton.textContent = 'Export unavailable';
    }
  }
});

window.addEventListener('hashchange', () => renderLesson(location.hash.slice(1) || 'start', { scroll: true }));
window.addEventListener('display-preferences-change', () => {
  if (getChartInfo(currentId)) renderChart(currentId, $('#lesson-chart'));
  if (uploadedPoints.length) drawUploadedChart();
});

renderLesson(currentId);

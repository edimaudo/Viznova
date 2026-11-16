function drawLandingChart() {
  const el = document.getElementById('landing-chart'); if (!el) return;
  if (!window.Plotly) { el.textContent = 'Chart preview unavailable. Connect to the internet to load Plotly.js.'; el.classList.add('chart-fallback'); return; }
  const scale = Number(getComputedStyle(document.documentElement).getPropertyValue('--font-scale')) || 1;
  const rootStyles = getComputedStyle(document.documentElement);
  const text = rootStyles.getPropertyValue('--text').trim(), muted = rootStyles.getPropertyValue('--text-muted').trim(), bg = rootStyles.getPropertyValue('--bg').trim(), grid = rootStyles.getPropertyValue('--border').trim();
  const accent = rootStyles.getPropertyValue('--link').trim();
  const data = [{ type: 'scatter', mode: 'lines+markers', x: ['Jan','Feb','Mar','Apr','May','Jun'], y: [42,48,53,50,63,71], line: { color: accent, width: 3 }, marker: { size: 7 }, hovertemplate: '%{x}: $%{y}k<extra></extra>' }];
  const layout = { autosize: true, height: Math.round(250 * scale), margin: { l: Math.round(48 * scale), r: Math.round(16 * scale), t: Math.round(10 * scale), b: Math.round(42 * scale) }, paper_bgcolor: bg, plot_bgcolor: bg, font: { family: 'Inter, sans-serif', size: 11 * scale, color: text }, xaxis: { title: { text: 'Month', font: { size: 11 * scale, color: muted } }, tickfont: { color: muted, size: 10 * scale }, showgrid: false }, yaxis: { title: { text: 'Revenue ($k)', font: { size: 11 * scale, color: muted } }, tickfont: { color: muted, size: 10 * scale }, gridcolor: grid }, showlegend: false };
  el.classList.remove('chart-fallback');
  Plotly.react(el, data, layout, { responsive: true, displayModeBar: false }).catch(() => { el.textContent = 'Chart preview unavailable. The learning app contains the worked examples and data tables.'; el.classList.add('chart-fallback'); });
}
window.addEventListener('load', drawLandingChart);
window.addEventListener('display-preferences-change', drawLandingChart);

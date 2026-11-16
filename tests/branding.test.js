import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(path, import.meta.url), 'utf8');

test('Viznova landing page keeps navigation minimal and the curriculum inside the app', async () => {
  const html = await read('../index.html');
  assert.match(html, /<title>Viznova/);
  assert.match(html, />Viznova<\/a>/);
  assert.doesNotMatch(html, /Curriculum|Learning app|Start learning|Practical Plotly lessons/i);
  assert.doesNotMatch(html, /Every chart lesson connects the full process/i);
  assert.doesNotMatch(html, /<footer\b/i);
  assert.doesNotMatch(html, /class="site-nav"/);
  assert.equal((html.match(/class="learning-card"/g) || []).length, 5);
  assert.match(html, /What you will learn/);
  const cardSection = html.match(/<div class="learning-cards">([\s\S]*?)<\/div>/)?.[1] || '';
  assert.doesNotMatch(cardSection, /→|↗/);
  assert.doesNotMatch(cardSection, /<span[^>]*>\s*\d+\.?\s*<\/span>/);
});

test('learning app retains its curriculum and uses Viznova branding without footer regions', async () => {
  const html = await read('../learn.html');
  const app = await read('../assets/js/app.js');
  assert.match(html, /<title>Viznova/);
  assert.match(html, /aria-label="Curriculum"/);
  assert.match(html, /id="course-nav"/);
  assert.doesNotMatch(html, /<footer\b|sidebar-bottom|Learning app/);
  assert.doesNotMatch(app, /lesson-footer|Visualize/);
  assert.match(app, /\| Viznova`/);
});

test('landing cards share a five-column desktop row and app styling is low-chrome', async () => {
  const css = await read('../assets/css/styles.css');
  assert.match(css, /\.learning-cards\s*\{\s*display:grid;\s*grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);
  assert.match(css, /\.learning-card\s*\{[^}]*border-radius:0;[^}]*box-shadow:none;/s);
  assert.doesNotMatch(css, /\.site-footer|\.sidebar-bottom|\.lesson-footer/);
});

test('decision framework and chart-selection lesson use accessible semantic HTML', async () => {
  const content = await read('../assets/js/content.js');
  const styles = await read('../assets/css/styles.css');
  assert.match(content, /<ol class="decision-flow">/);
  assert.match(content, /class="selection-table"><table>/);
  assert.match(content, /<th scope="row">Compare categories<\/th>/);
  assert.match(styles, /\.decision-flow\s*\{[^}]*list-style:none;/s);
  assert.match(styles, /\.selection-table tbody th/);
});

test('Viznova wordmark has no decorative logo mark on either page', async () => {
  const landing = await read('../index.html');
  const learning = await read('../learn.html');
  const css = await read('../assets/css/styles.css');
  assert.doesNotMatch(landing + learning, /brand-mark|logo-mark/);
  assert.doesNotMatch(css, /\.brand-mark\s*\{/);
  assert.match(landing, /<a class="brand"[^>]*>Viznova<\/a>/);
  assert.match(learning, /<a class="brand"[^>]*>Viznova<\/a>/);
});

test('learning page reports module initialization failures instead of remaining blank', async () => {
  const html = await read('../learn.html');
  assert.match(html, /id="module-status"/);
  assert.match(html, /import\('\.\/assets\/js\/app\.js(?:\?v=[^']+)?'\)\.catch/);
  assert.match(html, /location\.protocol === 'file:'/);
  assert.match(html, /python3 -m http\.server 8000/);
  assert.match(html, /Viznova could not open the learning area/);
});

test('theme toggle and font selector share one height token at desktop and mobile widths', async () => {
  const css = await read('../assets/css/styles.css');
  assert.match(css, /--display-control-height:2\.5rem/);
  assert.match(css, /\.icon-button \{[^}]*height:var\(--display-control-height\);[^}]*min-height:var\(--display-control-height\);/s);
  assert.match(css, /\.font-select \{[^}]*height:var\(--display-control-height\);[^}]*min-height:var\(--display-control-height\);/s);
  assert.match(css, /:root \{ --display-control-height:2\.35rem; \}/);
  assert.match(css, /\.site-header \.icon-button,[\s\S]*?height:var\(--display-control-height\);[\s\S]*?\.app-header \.font-select[\s\S]*?height:var\(--display-control-height\);/);
});


test('dark sidebar selection and keyboard focus use the Viznova accent instead of yellow', async () => {
  const css = await read('../assets/css/styles.css');
  assert.match(css, /:root\[data-theme="dark"\] \.nav-link\.is-active/);
  assert.match(css, /:root\[data-theme="dark"\] \.nav-link:focus-visible/);
  assert.doesNotMatch(css, /--focus:\s*#(?:ff|f[0-9a-f])(?:d166|[a-f0-9]{4})/i);
});


test('the complete chart catalogue contains the requested chart types without Q-Q', async () => {
  const { navigation } = await import('../assets/js/content.js');
  const ids = navigation.find(group => group.title === 'Chart library').items.map(item => item.id);
  for (const id of ['dotplot','density','dotchart','bubble','gauge','balloon','mosaic','radar','sunburst','strip']) {
    assert.ok(ids.includes(id), `missing chart type: ${id}`);
  }
  assert.equal(ids.includes(['q', 'q'].join('')), false);
  assert.equal(ids.length, 21);
});


test('further-reading lesson points learners to official Plotly and accessibility documentation', async () => {
  const { lessons } = await import('../assets/js/content.js');
  const sources = lessons.sources.sections.map(section => section.body).join(' ');
  assert.match(sources, /plotly\.com\/javascript/);
  assert.match(sources, /plotly\.com\/python/);
  assert.match(sources, /plotly\.com\/r/);
  assert.match(sources, /www\.w3\.org\/TR\/WCAG22/);
});


test('learning header provides a safe current-section target for lesson rendering', async () => {
  const html = await read('../learn.html');
  const app = await read('../assets/js/app.js');
  assert.match(html, /id="header-current-section"/);
  assert.match(app, /const headerCurrentSection = \$\('#header-current-section'\);/);
  assert.match(app, /if \(headerCurrentSection\) headerCurrentSection\.textContent = lesson\.section/);
  assert.match(html, /app\.js\?v=20261116-6/);
});

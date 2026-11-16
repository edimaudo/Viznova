import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as charting from '../assets/js/charting.js';

const read = path => readFile(new URL(path, import.meta.url), 'utf8');
const BUILD = '20261116-6';

test('application module dependencies use the current cache-busting build version', async () => {
  const app = await read('../assets/js/app.js');
  const learning = await read('../learn.html');
  assert.match(app, new RegExp(`content\\.js\\?v=${BUILD}`));
  assert.match(app, new RegExp(`csv\\.js\\?v=${BUILD}`));
  assert.match(app, new RegExp(`charting\\.js\\?v=${BUILD}`));
  assert.match(learning, new RegExp(`app\\.js\\?v=${BUILD}`));
  assert.match(learning, new RegExp(`styles\\.css\\?v=${BUILD}`));
});

test('chart dark palette is optional at module-link time and has a readable fallback', async () => {
  const app = await read('../assets/js/app.js');
  assert.match(app, /import \* as chartingModule from/);
  assert.doesNotMatch(app, /import\s*\{[^}]*chartPalettesDark[^}]*\}\s*from/);
  assert.match(app, /chartingModule\.chartPalettesDark\s*\|\|/);
  assert.match(app, /blue:\s*\['#8cc9ef'/);
  assert.ok(charting.chartPalettesDark?.blue?.length >= 3, 'current charting module should export its dark palette');
});

test('learner-facing module failure message hides implementation details', async () => {
  const html = await read('../learn.html');
  assert.match(html, /Viznova could not open the learning area/);
  assert.match(html, /Refresh this page to try again/);
  assert.doesNotMatch(html, /Technical detail|chartPalettesDark|assets\/js\/app\.js, assets\/js/);
});

test('all named imports in app.js resolve to exports in their target modules', async () => {
  const app = await read('../assets/js/app.js');
  const matches = [...app.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"];?/g)];
  assert.ok(matches.length >= 2, 'expected content and CSV named imports');
  for (const [, names, specifier] of matches) {
    const modulePath = new URL(specifier.replace(/\?v=.*$/, ''), new URL('../assets/js/app.js', import.meta.url));
    const source = await readFile(modulePath, 'utf8');
    const available = new Set([
      ...[...source.matchAll(/export\s+(?:async\s+)?(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g)].map(match => match[1]),
      ...[...source.matchAll(/export\s*\{([^}]+)\}/g)].flatMap(match => match[1].split(',').map(entry => entry.trim().split(/\s+as\s+/).at(-1)))
    ]);
    for (const raw of names.split(',')) {
      const binding = raw.trim().split(/\s+as\s+/)[0];
      assert.ok(available.has(binding), `${specifier} must export ${binding}`);
    }
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

class FakeElement {
  constructor(value = '') { this.value = value; this.attributes = {}; this.listeners = {}; this.textContent = ''; this.icon = null; }
  addEventListener(type, callback) { (this.listeners[type] ||= []).push(callback); }
  setAttribute(name, value) { this.attributes[name] = value; }
  querySelector(selector) { return selector === '[data-theme-icon]' ? this.icon : null; }
  fire(type, event = {}) { for (const callback of this.listeners[type] || []) callback({ target: this, ...event }); }
}

function runPreferences(saved = {}) {
  const root = { dataset: {}, style: { values: {}, setProperty(key, value) { this.values[key] = value; } } };
  const themeButton = new FakeElement();
  themeButton.icon = new FakeElement();
  const fontControls = [new FakeElement('medium'), new FakeElement('medium')];
  const values = new Map([['viznova-preferences-v1', JSON.stringify(saved)]]);
  const localStorage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  const events = [];
  const document = {
    readyState: 'complete',
    documentElement: root,
    querySelectorAll(selector) {
      if (selector === '[data-theme-toggle]') return [themeButton];
      if (selector === 'select[data-font-scale]') return fontControls;
      return [];
    }
  };
  class CustomEvent { constructor(type, options) { this.type = type; this.detail = options?.detail; } }
  const window = { dispatchEvent: event => events.push(event) };
  const source = awaitRead;
  vm.runInNewContext(source, { document, window, localStorage, CustomEvent });
  return { root, themeButton, fontControls, values, events };
}

const awaitRead = await readFile(new URL('../assets/js/preferences.js', import.meta.url), 'utf8');

test('display preferences apply and persist all theme/font combinations', () => {
  const state = runPreferences();
  assert.equal(state.root.dataset.theme, 'light');
  assert.equal(state.root.dataset.fontScale, 'medium');
  assert.equal(state.root.style.values['--font-scale'], '1');

  state.themeButton.fire('click');
  assert.equal(state.root.dataset.theme, 'dark');
  assert.equal(state.themeButton.attributes['aria-pressed'], 'true');
  assert.equal(state.themeButton.attributes['aria-label'], 'Switch to light mode');

  for (const [font, expected] of [['small','0.75'], ['medium','1'], ['large','1.25']]) {
    state.fontControls[0].value = font;
    state.fontControls[0].fire('change');
    assert.equal(state.root.dataset.fontScale, font);
    assert.equal(state.root.style.values['--font-scale'], expected);
    assert.ok(state.fontControls.every(control => control.value === font));
    const saved = JSON.parse(state.values.get('viznova-preferences-v1'));
    assert.equal(saved.fontScale, font);
    assert.equal(saved.theme, 'dark');
  }

  state.themeButton.fire('click');
  assert.equal(state.root.dataset.theme, 'light');
  assert.equal(JSON.parse(state.values.get('viznova-preferences-v1')).theme, 'light');
  assert.ok(state.events.length >= 5);
});

test('saved display preferences are restored safely', () => {
  const state = runPreferences({ theme: 'dark', fontScale: 'large' });
  assert.equal(state.root.dataset.theme, 'dark');
  assert.equal(state.root.dataset.fontScale, 'large');
  assert.equal(state.root.style.values['--font-scale'], '1.25');
});

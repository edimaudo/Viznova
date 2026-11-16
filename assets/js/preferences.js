(() => {
  const root = document.documentElement, key = 'viznova-preferences-v1';
  const scales = { small: '0.75', medium: '1', large: '1.25' };
  let prefs = { theme: 'light', fontScale: 'medium' };
  try { const saved = JSON.parse(localStorage.getItem(key) || '{}'); if (['light','dark'].includes(saved.theme)) prefs.theme = saved.theme; if (scales[saved.fontScale]) prefs.fontScale = saved.fontScale; } catch {}
  function apply() {
    root.dataset.theme = prefs.theme; root.dataset.fontScale = prefs.fontScale; root.style.setProperty('--font-scale', scales[prefs.fontScale]);
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => { const next = prefs.theme === 'light' ? 'dark' : 'light'; btn.setAttribute('aria-label', `Switch to ${next} mode`); btn.setAttribute('aria-pressed', String(prefs.theme === 'dark')); const icon = btn.querySelector('[data-theme-icon]'); if (icon) icon.textContent = prefs.theme === 'light' ? '☾' : '☀'; });
    document.querySelectorAll('select[data-font-scale]').forEach(el => el.value = prefs.fontScale);
    try { localStorage.setItem(key, JSON.stringify(prefs)); } catch {}
    window.dispatchEvent(new CustomEvent('display-preferences-change', { detail: { ...prefs } }));
  }
  function bind() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', () => { prefs.theme = prefs.theme === 'light' ? 'dark' : 'light'; apply(); }));
    document.querySelectorAll('select[data-font-scale]').forEach(el => el.addEventListener('change', event => { if (scales[event.target.value]) { prefs.fontScale = event.target.value; apply(); } }));
    apply();
  }
  root.dataset.theme = prefs.theme; root.dataset.fontScale = prefs.fontScale; root.style.setProperty('--font-scale', scales[prefs.fontScale]);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, { once: true }); else bind();
})();

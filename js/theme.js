(() => {
  const root = document.documentElement;
  const KEY = 'aos-theme';
  const meta = document.querySelector('meta[name="theme-color"]');
  const bar = { dark: '#050505', light: '#f6f6f4' };

  function paint(theme) {
    root.dataset.theme = theme;
    if (meta) meta.setAttribute('content', bar[theme]);
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀' : '☾';
      btn.querySelector('.theme-label').textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
  }
  function setTheme(theme) {
    root.classList.add('theme-anim');
    paint(theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    setTimeout(() => root.classList.remove('theme-anim'), 450);
  }

  paint(root.dataset.theme === 'light' ? 'light' : 'dark');
  document.addEventListener('click', e => {
    if (e.target.closest('[data-theme-toggle]')) setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

})();

(() => {
  const screen = document.getElementById('bootScreen');
  const bar = document.getElementById('bootProgress');
  const percent = document.getElementById('bootPercent');
  const status = document.getElementById('bootStatus');
  if (!screen || !bar || !percent) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reduceMotion ? 450 : 2100;
  const started = performance.now();
  const messages = [
    [0, 'INITIALIZING CORPORATE SYSTEMS'],
    [28, 'LOADING AOS ENVIRONMENT'],
    [58, 'PREPARING DIGITAL SERVICES'],
    [82, 'CONNECTING MAIN INTERFACE'],
    [100, 'SYSTEM READY']
  ];
  let lastMessage = '';

  function tick(now) {
    const ratio = Math.min((now - started) / duration, 1);
    const value = Math.round((1 - Math.pow(1 - ratio, 1.5)) * 100);
    bar.style.width = value + '%';
    percent.textContent = String(value).padStart(2, '0') + '%';
    const current = [...messages].reverse().find(([at]) => value >= at);
    if (current && current[1] !== lastMessage) {
      status.textContent = current[1];
      lastMessage = current[1];
    }
    if (ratio < 1) requestAnimationFrame(tick);
    else finish();
  }

  function finish() {
    const logoWrap = screen.querySelector('.boot-logo-wrap');
    const logo = screen.querySelector('.boot-logo');
    if (logo) logo.style.animation = 'none';
    if (logoWrap) {
      const source = logoWrap.getBoundingClientRect();
      const target = document.querySelector('.brand-mark');
      if (target) {
        const destination = target.getBoundingClientRect();
        const dx = destination.left + destination.width / 2 - (source.left + source.width / 2);
        const dy = destination.top + destination.height / 2 - (source.top + source.height / 2);
        logoWrap.style.transition = 'transform .85s cubic-bezier(.2,.8,.2,1), width .85s, height .85s';
        logoWrap.style.position = 'fixed';
        logoWrap.style.left = source.left + 'px';
        logoWrap.style.top = source.top + 'px';
        logoWrap.style.zIndex = '110';
        requestAnimationFrame(() => {
          logoWrap.style.transform = `translate(${dx}px, ${dy}px) scale(${destination.width / source.width})`;
        });
      }
    }
    setTimeout(() => {
      screen.classList.add('is-exiting');
      document.body.classList.remove('is-loading');
      document.body.classList.add('site-ready');
      setTimeout(() => screen.remove(), 700);
    }, 500);
  }

  window.addEventListener('load', () => requestAnimationFrame(tick), { once: true });
  // Safety fallback for slow or blocked external resources.
  setTimeout(() => {
    if (document.body.classList.contains('is-loading')) finish();
  }, 5000);
})();

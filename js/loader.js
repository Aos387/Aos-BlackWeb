(() => {
  const FRAMES = 16;                       // nº de frames de la secuencia (logo-01.webp … logo-16.webp)
  const DURATION = 1400;                   // ms que dura la secuencia completa (más bajo = más rápido)
  const framePath = n => `assets/images/seq/logo-${String(n).padStart(2, '0')}.webp`;

  const screen = document.getElementById('bootScreen');
  const canvas = document.getElementById('bootCanvas');
  const status = document.getElementById('bootStatus');
  const center = document.getElementById('bootCenter');
  const enterBtn = document.getElementById('bootEnter');
  if (!screen || !canvas || !enterBtn) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reduceMotion ? 700 : DURATION;
  const guarded = ['#siteHeader', '#mainContent', '.site-footer', '#requestModal'].map(s => document.querySelector(s)).filter(Boolean);
  guarded.forEach(el => { el.inert = true; });          // no se puede tabular al contenido hasta pulsar VER


  // precarga de la secuencia (si un frame falla, no bloquea la entrada)
  let loaded = 0;
  const imgs = Array.from({ length: FRAMES }, (_, i) => {
    const img = new Image();
    img.onload = img.onerror = () => { loaded++; };
    img.src = framePath(i + 1);
    return img;
  });
  setTimeout(() => { loaded = FRAMES; }, 9000);          // seguridad ante red lenta

  const messages = [
    [0, 'INITIALIZING CORPORATE SYSTEMS'],
    [28, 'LOADING AOS ENVIRONMENT'],
    [58, 'PREPARING DIGITAL SERVICES'],
    [82, 'CONNECTING MAIN INTERFACE'],
    [100, 'SYSTEM READY — PULSA VER']
  ];
  let lastMsg = '', progress = 0, ready = false, entered = false;

  function draw(p) {
    const pos = p * (FRAMES - 1);
    const i = Math.min(Math.floor(pos), FRAMES - 1);
    const t = pos - i;
    const a = imgs[i], b = imgs[Math.min(i + 1, FRAMES - 1)];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (a.naturalWidth) { ctx.globalAlpha = i === FRAMES - 1 ? 1 : 1 - t; ctx.drawImage(a, 0, 0, canvas.width, canvas.height); }
    if (t > 0 && b !== a && b.naturalWidth) { ctx.globalAlpha = t; ctx.drawImage(b, 0, 0, canvas.width, canvas.height); }
    ctx.globalAlpha = 1;
    return Math.round(pos);                               // frame "actual" (0-15)
  }

  const started = performance.now();
  function tick(now) {
    const time = Math.min((now - started) / duration, 1);
    const eased = time;                                                // lineal: la secuencia va a ritmo constante
    progress = Math.max(progress, Math.min(eased, loaded / FRAMES));   // nunca va por delante de lo cargado
    draw(progress);
    const value = Math.round(progress * 100);
    const msg = [...messages].reverse().find(([at]) => value >= at);
    if (msg && msg[1] !== lastMsg) { status.textContent = msg[1]; lastMsg = msg[1]; }
    if (progress < 1) requestAnimationFrame(tick); else finishLoading();
  }

  function finishLoading() {
    if (ready) return;
    ready = true;
    draw(1);
    center.classList.add('is-ready');
    enterBtn.disabled = false;
    enterBtn.focus({ preventScroll: true });
  }

  function enter() {
    if (!ready || entered) return;
    entered = true;
    enterBtn.disabled = true;
    const wrap = screen.querySelector('.boot-logo-wrap');
    const target = document.querySelector('.brand-mark');
    document.body.classList.remove('is-loading');
    document.body.classList.add('site-ready');
    guarded.forEach(el => { el.inert = false; });
    window.scrollTo(0, 0);
    screen.classList.add('is-exiting');
    if (wrap && target) {                                  // el logo vuela hasta la cabecera
      const s = wrap.getBoundingClientRect(), d = target.getBoundingClientRect();
      const dx = d.left + d.width / 2 - (s.left + s.width / 2);
      const dy = d.top + d.height / 2 - (s.top + s.height / 2);
      wrap.style.transition = reduceMotion ? 'none' : 'transform .9s cubic-bezier(.65,0,.2,1), opacity .35s ease .55s';
      requestAnimationFrame(() => { wrap.style.opacity = '0'; wrap.style.transform = `translate(${dx}px, ${dy}px) scale(${d.height / s.height})`; });
    }
    window.dispatchEvent(new Event('aos:enter'));
    setTimeout(() => screen.remove(), reduceMotion ? 50 : 950);
  }

  enterBtn.addEventListener('click', enter);
  // tras elegir modo claro/oscuro en la intro, el foco vuelve a VER (Enter sigue entrando)
  const bootTheme = screen.querySelector('[data-theme-toggle]');
  if (bootTheme) bootTheme.addEventListener('click', () => { if (ready && !entered) enterBtn.focus({ preventScroll: true }); });
  enterBtn.disabled = true;
  requestAnimationFrame(tick);
})();

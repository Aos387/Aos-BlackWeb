// Generación de texto con símbolos aleatorios.
//  - Al pulsar VER, todo el texto de la web se "genera" (de símbolos a letras) según va entrando en pantalla.
//  - Al pasar el ratón / hacer clic en un elemento, su texto se regenera.
(() => {
  const SYMS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+-_<>/\\[]{}=?!@';
  const rnd = () => SYMS[(Math.random() * SYMS.length) | 0];
  const REAL = /[\p{L}\p{N}]/u;                       // solo se "mezclan" letras y números
  const ROOTS = '#siteHeader,#mainContent,.site-footer';
  const SKIP = 'script,style,noscript,textarea,input,svg,#requestModal,.hero-emblem';
  const HOVER = 'a,button,.service-row,.division-title,.section-heading,.hero-title,.process-grid>div,.product-info h3,.product-tags span,.product-window';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const orig = new WeakMap();          // nodo de texto -> texto original
  const parents = new Map();           // elemento -> nodos de texto que contiene
  const active = new Map();            // elemento -> animación en curso
  const lastRun = new WeakMap();
  let entered = false, raf = 0;

  function textNodes(root) {
    const out = [];
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.nodeValue.trim() && n.parentElement && !n.parentElement.closest(SKIP))
        ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    });
    while (w.nextNode()) out.push(w.currentNode);
    return out;
  }
  function register(n) {
    if (!orig.has(n)) orig.set(n, n.nodeValue);
    const p = n.parentElement;
    if (!parents.has(p)) parents.set(p, []);
    const list = parents.get(p);
    if (!list.includes(n)) list.push(n);
    return p;
  }

  function mix(final, resolveAt, elapsed, phase) {
    let s = '';
    for (let i = 0; i < final.length; i++) {
      const c = final[i];
      s += (!REAL.test(c) || elapsed >= resolveAt[i]) ? c : rnd();
    }
    return s;
  }

  function run(el, delay = 0) {
    if (active.has(el)) return;
    const nodes = (parents.get(el) || []).filter(n => n.isConnected);
    if (!nodes.length) { el.classList.remove('scr-pending'); return; }
    if (reduce) { nodes.forEach(n => { n.nodeValue = orig.get(n); }); el.classList.remove('scr-pending'); return; }
    const longest = Math.max(...nodes.map(n => orig.get(n).length));
    const dur = Math.min(1000, 360 + longest * 15);
    const items = nodes.map(n => {
      const final = orig.get(n);
      return { n, final, at: Array.from(final, (_, i) => (i / final.length) * dur * 0.72 + Math.random() * dur * 0.28), phase: -1, text: final };
    });
    active.set(el, { items, start: performance.now() + delay, dur, shown: false });
    lastRun.set(el, performance.now());
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function tick(now) {
    raf = 0;
    const phase = Math.floor(now / 55);                // los símbolos cambian ~18 veces/s
    for (const [el, a] of active) {
      if (now < a.start) continue;
      if (!a.shown) { a.shown = true; el.classList.remove('scr-pending'); el.classList.add('scr'); }
      const elapsed = now - a.start;
      const done = elapsed >= a.dur;
      for (const it of a.items) {
        if (done) { it.n.nodeValue = it.final; continue; }
        if (it.phase !== phase) { it.phase = phase; it.text = mix(it.final, it.at, elapsed, phase); }
        it.n.nodeValue = it.text;
      }
      if (done) { el.classList.remove('scr'); active.delete(el); lastRun.set(el, now); }
    }
    if (active.size) raf = requestAnimationFrame(tick);
  }

  // ---- regenerar al interactuar
  function regen(target, force) {
    if (!entered || !target.closest(ROOTS)) return;
    const now = performance.now();
    if (!force && now - (lastRun.get(target) || 0) < 700) return;
    const mine = textNodes(target);
    let i = 0;
    mine.forEach(register);
    new Set(mine.map(n => n.parentElement)).forEach(p => {
      if (p.classList.contains('scr-pending')) return;      // aún no se ha generado por primera vez
      run(p, i++ * 25);
    });
    lastRun.set(target, now);
  }
  document.addEventListener('pointerover', e => {
    const t = e.target.closest && e.target.closest(HOVER);
    if (!t || (e.relatedTarget && t.contains(e.relatedTarget))) return;
    regen(t, false);
  });
  document.addEventListener('click', e => {
    if (e.target.closest('[data-theme-toggle]')) { setTimeout(regenViewport, 60); return; }
    const t = e.target.closest(HOVER);
    if (t) regen(t, true);
  });
  function regenViewport() {                       // al cambiar de modo se regenera todo lo visible
    let i = 0;
    for (const [el] of parents) {
      const r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight && !el.classList.contains('scr-pending')) run(el, (i++ % 30) * 20);
    }
  }

  // ---- generación inicial (cuando se pulsa VER)
  function start() {
    if (entered) return;
    entered = true;
    const els = [...parents.keys()].filter(el => el.classList.contains('scr-pending'));
    if (!('IntersectionObserver' in window)) { els.forEach(el => run(el)); return; }
    let first = true;
    const io = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting).map(e => e.target);
      vis.sort((a, b) => { const A = a.getBoundingClientRect(), B = b.getBoundingClientRect(); return (A.top - B.top) || (A.left - B.left); });
      const base = first ? 450 : 0;                 // la primera tanda espera a que el logo se contraiga
      first = false;
      vis.forEach((el, i) => { run(el, base + Math.min(i * 28, 900)); io.unobserve(el); });
    }, { threshold: 0.01, rootMargin: '0px 0px -3% 0px' });
    els.forEach(el => io.observe(el));
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(ROOTS).forEach(root => {
      textNodes(root).forEach(n => {
        const p = n.parentElement;
        if (!p.getClientRects().length) { orig.set(n, n.nodeValue); parents.set(p, [n]); return; }   // oculto (p. ej. menú móvil): se deja tal cual
        register(n).classList.add('scr-pending');                                                   // texto invisible hasta que le toque generarse
      });
    });
    if (document.body.classList.contains('is-loading')) window.addEventListener('aos:enter', start, { once: true });
    else start();
  }, { once: true });
})();

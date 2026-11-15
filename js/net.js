// Fondo: red de puntos QUIETA. Solo se mueve al hacer scroll (se aleja hacia arriba al bajar)
// y van apareciendo más puntos según se baja, siguiendo un patrón (rejilla con desplazamiento aleatorio fijo).
// El cursor se sigue conectando con los puntos cercanos.
(() => {
  const cv = document.getElementById('netBg');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BLUE = '50,200,244';                 // mismo azul que el botón (#32c8f4)
  const LINK = 150, MOUSE_LINK = 200;
  const PARALLAX = 0.45;                     // los puntos recorren el 45 % del scroll (se alejan más despacio que el contenido)
  const CELL = 110, CHUNK = CELL * 2;        // patrón: celdas de 110 px, bloques de 2 filas
  let W = 0, H = 0, dpr = 1, cols = 1;
  let target = scrollY, current = scrollY, dirty = true, raf = 0;
  const mouse = { x: -9999, y: -9999 };
  let dotRGB = '255,255,255', dotA = 0.9, lineA = 0.55;
  const cache = new Map();

  // aleatorio determinista: el mismo bloque siempre genera los mismos puntos (al subir reaparecen igual)
  const hash = (a, b, c) => { let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0; h = (h ^ (h >>> 13)) * 1274126177 | 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  const density = idx => Math.min(0.86, 0.40 + idx * 0.045);     // cuanto más se baja, más puntos

  function chunk(idx) {
    const key = idx + ':' + cols;
    let pts = cache.get(key);
    if (pts) return pts;
    pts = [];
    for (let r = 0; r < 2; r++) for (let c = 0; c < cols; c++) {
      const s = idx * 977 + r * 31 + c;
      if (hash(s, 1, 7) > density(idx)) continue;
      pts.push({
        x: (c + 0.12 + hash(s, 2, 7) * 0.76) * (W / cols),
        y: idx * CHUNK + (r + 0.12 + hash(s, 3, 7) * 0.76) * CELL,
        r: 1.3 + hash(s, 4, 7) * 1.5,
        plus: hash(s, 5, 7) < 0.13, s: 2.5 + hash(s, 6, 7) * 3.5
      });
    }
    if (cache.size > 200) cache.clear();
    cache.set(key, pts);
    return pts;
  }

  function theme() {
    const light = root.dataset.theme === 'light';
    dotRGB = light ? '22,22,26' : '255,255,255';
    dotA = light ? 0.85 : 0.9;
    lineA = light ? 0.45 : 0.55;
    dirty = true; kick();
  }
  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

  function draw() {
    const off = current * PARALLAX;
    ctx.clearRect(0, 0, W, H);
    const first = Math.floor((off - 40) / CHUNK), last = Math.floor((off + H + 40) / CHUNK);
    const vis = [];
    for (let i = Math.max(0, first); i <= last; i++) for (const p of chunk(i)) {
      const y = p.y - off;
      if (y < -30 || y > H + 30) continue;
      // los puntos "aparecen" por abajo y se desvanecen por arriba
      vis.push({ x: p.x, y, r: p.r, plus: p.plus, s: p.s, a: smooth(H + 10, H - 150, y) * smooth(-20, 60, y) });
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < vis.length; i++) {
      const a = vis[i];
      if (a.plus) continue;
      for (let j = i + 1; j < vis.length; j++) {
        const b = vis[j];
        if (b.plus) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          const al = (1 - d / LINK) * lineA * Math.min(a.a, b.a);
          if (al > 0.01) { ctx.strokeStyle = `rgba(${BLUE},${al.toFixed(3)})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
      const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (md < MOUSE_LINK) {                    // el cursor se conecta con los puntos cercanos
        ctx.strokeStyle = `rgba(${BLUE},${((1 - md / MOUSE_LINK) * Math.min(1, lineA + 0.25) * a.a).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    for (const p of vis) {
      ctx.fillStyle = ctx.strokeStyle = `rgba(${dotRGB},${(dotA * p.a).toFixed(3)})`;
      if (p.plus) { ctx.beginPath(); ctx.moveTo(p.x - p.s, p.y); ctx.lineTo(p.x + p.s, p.y); ctx.moveTo(p.x, p.y - p.s); ctx.lineTo(p.x, p.y + p.s); ctx.stroke(); }
      else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill(); }
    }
  }

  function loop() {
    raf = 0;
    const diff = target - current;
    if (Math.abs(diff) > 0.1) { current += reduce ? diff : diff * 0.14; dirty = true; } else current = target;   // inercia suave al hacer scroll
    if (dirty) { dirty = false; draw(); }
    if (Math.abs(target - current) > 0.1) kick();
  }
  function kick() { if (!raf) raf = requestAnimationFrame(loop); }

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.max(3, Math.round(W / CELL));
    cache.clear(); dirty = true; kick();
  }

  addEventListener('scroll', () => { target = scrollY; kick(); }, { passive: true });
  addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; dirty = true; kick(); }, { passive: true });
  document.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; dirty = true; kick(); });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 120); });
  new MutationObserver(theme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  theme(); resize();
})();

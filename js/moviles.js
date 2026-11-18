// Asistente de reparación de móviles: marca → modelo → avería (con precio orientativo al instante).
(() => {
  const D = window.AOS_PHONES;
  const root = document.getElementById('wizard');
  if (!D || !root) return;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const eur = n => n.toLocaleString('es-ES') + ' €';
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9+]+/g, ' ').trim();
  const OTHER = { id: 'other', name: 'Otra avería', desc: 'No enciende, mojado, software, Face ID… cuéntanoslo y lo valoramos' };

  let state = { brand: null, model: null, repairs: [] };
  let query = '';

  const brandOf = id => D.brands.find(b => b.id === id);
  const modelOf = (b, name) => { for (const g of b.groups) for (const m of g.models) if (m[0] === name) return m; return null; };
  const priceOf = (m, rid) => rid === 'screen' ? m[1] : (D.tiers[m[2]] ? D.tiers[m[2]][rid] : null);
  const step = () => !state.brand ? 1 : (!state.model ? 2 : 3);

  // ---------- navegación (con historial: el botón "atrás" del móvil funciona)
  const snap = () => JSON.stringify({ brand: state.brand, model: state.model, repairs: state.repairs });
  function go(next, push = true) {
    state = Object.assign({ brand: null, model: null, repairs: [] }, next);
    query = '';
    if (push) history.pushState(snap(), '');
    render(true);
  }
  window.addEventListener('popstate', e => {
    try { state = e.state ? JSON.parse(e.state) : { brand: null, model: null, repairs: [] }; } catch { state = { brand: null, model: null, repairs: [] }; }
    query = ''; render(false);
  });

  // ---------- plantillas
  function stepper() {
    const s = step();
    const items = [['MARCA', 1], ['MODELO', 2], ['AVERÍA', 3]];
    return `<nav class="stepper" aria-label="Progreso">${items.map(([l, n]) =>
      `<button type="button" data-go="${n}" class="${n < s ? 'is-done' : n === s ? 'is-active' : ''}" ${n < s ? '' : 'tabindex="-1"'} aria-current="${n === s ? 'step' : 'false'}"><i>${n < s ? '✓' : n}</i><span>${l}</span></button>`).join('')}</nav>`;
  }
  function step1() {
    return `<h2 class="wz-title" tabindex="-1">¿De qué marca es tu móvil?</h2>
      <p class="wz-sub">Elige la marca y te enseñamos el precio de cada reparación al momento.</p>
      <div class="opt-grid brands">${D.brands.map(b => `<button type="button" class="opt brand-opt" data-brand="${b.id}"><b>${esc(b.name)}</b><small>${esc(b.sub)}</small></button>`).join('')}
        <button type="button" class="opt brand-opt is-ghost" data-brand="other"><b>Otra marca</b><small>No está en la lista</small></button></div>`;
  }
  function modelListHTML(b) {
    const q = norm(query);
    const toks = q ? q.split(' ') : [];
    let html = '', total = 0;
    for (const g of b.groups) {
      const ms = g.models.filter(m => { const n = norm(m[0]); return toks.every(t => n.includes(t)); });
      if (!ms.length) continue;
      total += ms.length;
      html += `<div class="model-group">${q ? '' : `<h4>${esc(g.name.toUpperCase())}</h4>`}<div class="model-list">${ms.map(m => `<button type="button" class="model-btn" data-model="${esc(m[0])}">${esc(m[0])}</button>`).join('')}</div></div>`;
    }
    if (!total) html = `<p class="no-results">No encontramos «${esc(query)}». Prueba con otro nombre o <button type="button" class="link-cta" data-act="quote-model">pídenos presupuesto indicando tu modelo</button>.</p>`;
    return html;
  }
  function step2() {
    const b = brandOf(state.brand);
    return `<div class="ctx"><b>${esc(b.name)}</b><button type="button" class="link-cta" data-go="1">Cambiar marca</button></div>
      <h2 class="wz-title" tabindex="-1">¿Qué modelo es?</h2>
      <p class="wz-sub">Escribe para buscar o elígelo de la lista${b.id === 'apple' ? ' (en Ajustes › General › Información lo ves)' : ''}.</p>
      <input class="model-search" id="modelSearch" type="search" placeholder="Busca tu modelo… p. ej. ${b.groups[0].models[Math.min(2, b.groups[0].models.length - 1)][0]}" autocomplete="off" aria-label="Buscar modelo">
      <div id="modelList">${modelListHTML(b)}</div>
      <p class="wz-escape">¿No encuentras tu modelo? <button type="button" class="link-cta" data-act="quote-model">Pide tu presupuesto igualmente</button></p>`;
  }
  function otherBrand() {
    return `<div class="ctx"><b>Otra marca</b><button type="button" class="link-cta" data-go="1">Cambiar marca</button></div>
      <h2 class="wz-title" tabindex="-1">Cuéntanos qué móvil tienes</h2>
      <p class="wz-sub">Reparamos más marcas de las que aparecen en la lista. Indícanos marca, modelo y avería y te preparamos un presupuesto personalizado.</p>
      <div class="back-row"><button type="button" class="button button-primary" data-act="quote-other">PIDE TU PRESUPUESTO <span>→</span></button></div>`;
  }
  function step3() {
    const b = brandOf(state.brand), m = modelOf(b, state.model);
    const cards = D.repairs.map(r => {
      const p = priceOf(m, r.id);
      const on = state.repairs.includes(r.id);
      return `<button type="button" class="opt ${on ? 'is-on' : ''}" data-repair="${r.id}" aria-pressed="${on}"><span class="tick">✓</span><b>${esc(r.name)}</b><small>${esc(r.desc)}</small>
        <span class="price">${p != null ? `<em>desde</em>${eur(p)}` : 'A consultar'}</span></button>`;
    }).join('');
    const on = state.repairs.includes('other');
    const other = `<button type="button" class="opt is-ghost ${on ? 'is-on' : ''}" data-repair="other" aria-pressed="${on}"><span class="tick">✓</span><b>${OTHER.name}</b><small>${OTHER.desc}</small><span class="price">Presupuesto personalizado</span></button>`;
    const fold = m[1] == null ? '<p class="wz-note">Los plegables llevan paneles delicados: la pantalla se presupuesta a medida tras revisarlo.</p>' : '';
    return `<div class="ctx"><b>${esc(b.name)}</b><span class="sep">›</span><b>${esc(m[0])}</b><button type="button" class="link-cta" data-go="2">Cambiar modelo</button></div>
      <h2 class="wz-title" tabindex="-1">¿Qué necesita tu ${esc(m[0])}?</h2>
      <p class="wz-sub">Marca una o varias reparaciones. El precio es orientativo e incluye pieza y mano de obra (${esc(D.vat)}); lo confirmamos tras revisar el móvil.</p>
      <div class="opt-grid">${cards}${other}</div>${fold}
      <div class="wz-bar" id="wzBar"><div class="wz-total"><small>TOTAL ORIENTATIVO</small><b id="wzTotal">—</b></div>
        <button type="button" class="button button-primary" id="wzOrder" data-act="order" disabled>ELIGE UNA REPARACIÓN</button></div>
      <p class="wz-escape">¿No te cuadra o no ves tu avería? <button type="button" class="link-cta" data-act="quote">Pide tu presupuesto personalizado</button></p>`;
  }

  // ---------- cálculo del resumen
  function summary() {
    const b = brandOf(state.brand), m = modelOf(b, state.model);
    let sum = 0, custom = false; const lines = [];
    for (const id of state.repairs) {
      if (id === 'other') { custom = true; lines.push('Otra avería (a valorar)'); continue; }
      const r = D.repairs.find(x => x.id === id), p = priceOf(m, id);
      if (p == null) { custom = true; lines.push(`${r.name} (a consultar)`); } else { sum += p; lines.push(`${r.name} (desde ${eur(p)})`); }
    }
    return { b, m, sum, custom, lines };
  }
  function updateBar() {
    const bar = document.getElementById('wzBar'); if (!bar) return;
    const { sum, custom } = summary();
    const n = state.repairs.length;
    const total = document.getElementById('wzTotal'), btn = document.getElementById('wzOrder');
    if (!n) { total.textContent = '—'; btn.textContent = 'ELIGE UNA REPARACIÓN'; btn.disabled = true; return; }
    total.innerHTML = (sum ? `desde ${eur(sum)}` : 'A consultar') + (sum && custom ? '<span>+ a consultar</span>' : '');
    btn.disabled = false;
    btn.innerHTML = (custom ? 'PEDIR PRESUPUESTO' : 'PEDIR ESTA REPARACIÓN') + ' <span>→</span>';
  }

  // ---------- mensajes para el formulario
  function orderText() {
    const { b, m, sum, custom, lines } = summary();
    return ['Reparación de móvil', 'Marca: ' + b.name, 'Modelo: ' + m[0], 'Reparaciones: ' + lines.join(', '),
      sum ? 'Total orientativo: desde ' + eur(sum) + (custom ? ' (+ partes a consultar)' : '') + ' · ' + D.vat : 'Presupuesto: a consultar', '', 'Detalles adicionales: '].join('\n');
  }
  const quoteText = (brand, model) => ['Presupuesto personalizado — móvil', 'Marca: ' + brand, 'Modelo: ' + model, 'Avería o necesidad: ', ''].join('\n');
  const open = (type, text) => window.AosQuote ? window.AosQuote.open(type, text) : (location.href = 'index.html#contact');

  // ---------- render
  function render(focus) {
    const s = step();
    let inner;
    if (s === 1) inner = step1();
    else if (state.brand === 'other') inner = otherBrand();
    else inner = s === 2 ? step2() : step3();
    root.innerHTML = stepper() + `<div class="wz-panel">${inner}</div>`;
    if (s === 3) updateBar();
    if (focus) {
      const t = root.querySelector('.wz-title');
      root.querySelector('.stepper').scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (t) t.focus({ preventScroll: true });
    }
  }

  // ---------- eventos (delegación)
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t || !root.contains(t)) return;
    if (t.dataset.go) { const n = +t.dataset.go; go({ brand: n >= 2 ? state.brand : null, model: n >= 3 ? state.model : null, repairs: n >= 3 ? state.repairs : [] }); return; }
    if (t.dataset.brand) { go({ brand: t.dataset.brand }); return; }
    if (t.dataset.model) { go({ brand: state.brand, model: t.dataset.model }); return; }
    if (t.dataset.repair) {
      const id = t.dataset.repair, i = state.repairs.indexOf(id);
      if (i >= 0) state.repairs.splice(i, 1); else state.repairs.push(id);
      t.classList.toggle('is-on', i < 0); t.setAttribute('aria-pressed', String(i < 0));
      history.replaceState(snap(), ''); updateBar(); return;
    }
    const act = t.dataset.act; if (!act) return;
    if (act === 'order') { if (state.repairs.length) open(summary().custom ? 'phone-repair-quote' : 'phone-repair-order', orderText()); }
    else if (act === 'quote') { const b = brandOf(state.brand), m = state.model; open('phone-repair-quote', quoteText(b ? b.name : '', m || '')); }
    else if (act === 'quote-model') { const b = brandOf(state.brand); open('phone-repair-quote', quoteText(b ? b.name : '', query || '')); }
    else if (act === 'quote-other') open('phone-repair-quote', quoteText('', ''));
  });
  root.addEventListener('input', e => {
    if (e.target.id !== 'modelSearch') return;
    query = e.target.value;
    document.getElementById('modelList').innerHTML = modelListHTML(brandOf(state.brand));
  });

  // estado inicial (permite enlazar ?marca=apple)
  const qp = new URLSearchParams(location.search).get('marca');
  if (qp && brandOf(qp)) state.brand = qp;
  history.replaceState(snap(), '');
  render(false);
})();

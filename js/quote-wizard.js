// Asistente genérico "elige equipo → elige qué necesita → pide tu presupuesto".
// Se configura con window.AOS_WIZARD (ver reparacion-ordenadores.html y mantenimiento.html).
(() => {
  const C = window.AOS_WIZARD;
  const root = document.getElementById('wizard');
  if (!C || !root) return;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const NONE = ['No estoy seguro / otro', 'Cuéntanoslo con tus palabras y lo valoramos'];

  let state = { type: null, opts: [], chip: '', model: '', review: false };
  const typeOf = id => C.types.find(t => t.id === id);
  const step = () => !state.type ? 1 : (state.review ? 3 : 2);
  const snap = () => JSON.stringify(state);
  function go(next, push = true) { state = Object.assign({ type: null, opts: [], chip: '', model: '', review: false }, next); if (push) history.pushState(snap(), ''); render(true); }
  window.addEventListener('popstate', e => { try { state = e.state ? JSON.parse(e.state) : { type: null, opts: [], chip: '', model: '', review: false }; } catch { state = { type: null, opts: [], chip: '', model: '', review: false }; } render(false); });

  function stepper() {
    const s = step();
    return `<nav class="stepper" aria-label="Progreso">${C.stepLabels.map((l, i) => { const n = i + 1;
      return `<button type="button" data-go="${n}" class="${n < s ? 'is-done' : n === s ? 'is-active' : ''}" ${n < s ? '' : 'tabindex="-1"'} aria-current="${n === s ? 'step' : 'false'}"><i>${n < s ? '✓' : n}</i><span>${esc(l.toUpperCase())}</span></button>`; }).join('')}</nav>`;
  }
  function step1() {
    return `<h2 class="wz-title" tabindex="-1">${esc(C.s1.title)}</h2><p class="wz-sub">${esc(C.s1.sub)}</p>
      <div class="opt-grid">${C.types.map(t => `<button type="button" class="opt brand-opt" data-type="${t.id}"><b>${esc(t.name)}</b><small>${esc(t.desc)}</small></button>`).join('')}</div>`;
  }
  function allOptions(t) { return t.options.concat([NONE]); }
  function step2() {
    const t = typeOf(state.type);
    const cards = allOptions(t).map((o, i) => { const on = state.opts.includes(i), ghost = i === t.options.length;
      return `<button type="button" class="opt ${ghost ? 'is-ghost' : ''} ${on ? 'is-on' : ''}" data-opt="${i}" aria-pressed="${on}"><span class="tick">✓</span><b>${esc(o[0])}</b><small>${esc(o[1])}</small></button>`; }).join('');
    const chips = t.chips ? `<div class="extra-box"><label>${esc(t.chips.label)}</label><div class="chips">${t.chips.choices.map(c => `<button type="button" class="chip ${state.chip === c ? 'is-on' : ''}" data-chip="${esc(c)}">${esc(c)}</button>`).join('')}</div></div>` : '';
    return `<div class="ctx"><b>${esc(t.name)}</b><button type="button" class="link-cta" data-go="1">Cambiar</button></div>
      <h2 class="wz-title" tabindex="-1">${esc(C.s2.title)}</h2><p class="wz-sub">${esc(C.s2.sub)}</p>
      <div class="opt-grid">${cards}</div>${chips}
      <div class="extra-box"><label for="wzModel">${esc(t.modelLabel || C.modelLabel)}</label><input type="text" id="wzModel" value="${esc(state.model)}" placeholder="${esc(t.modelPlaceholder || C.modelPlaceholder)}" autocomplete="off"></div>
      <div class="wz-bar" id="wzBar"><div class="wz-total"><small>SELECCIONADO</small><b id="wzCount">—</b></div>
        <button type="button" class="button button-primary" id="wzNext" data-act="next" disabled>${esc(C.s2.cta)} <span>→</span></button></div>`;
  }
  function lines() { const t = typeOf(state.type), all = allOptions(t); return state.opts.map(i => all[i][0]); }
  function step3() {
    const t = typeOf(state.type);
    const rows = [[C.labels.type, t.name]];
    if (state.chip) rows.push([t.chips.short || 'Modelo', state.chip]);
    if (state.model) rows.push([t.modelShort || 'Marca / modelo', state.model]);
    rows.push([C.labels.opts, lines().join(' · ')]);
    return `<div class="ctx"><b>${esc(t.name)}</b><button type="button" class="link-cta" data-go="2">Editar selección</button></div>
      <h2 class="wz-title" tabindex="-1">${esc(C.s3.title)}</h2><p class="wz-sub">${esc(C.s3.sub)}</p>
      <div class="review"><div class="review-card"><h3>TU SOLICITUD</h3><dl>${rows.map(r => `<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join('')}</dl></div>
        <div class="review-cta"><p>${esc(C.s3.text)}</p><button type="button" class="button button-primary" data-act="quote">${esc(C.s3.cta)} <span>→</span></button></div></div>`;
  }
  function prefill() {
    const t = typeOf(state.type);
    const L = [C.prefillHeader, C.labels.type + ': ' + t.name];
    if (state.chip) L.push((t.chips.short || 'Modelo') + ': ' + state.chip);
    if (state.model) L.push((t.modelShort || 'Marca / modelo') + ': ' + state.model);
    L.push(C.labels.opts + ': ' + lines().join(', '), '', 'Detalles adicionales: ');
    return L.join('\n');
  }
  function updateBar() {
    const n = state.opts.length, c = document.getElementById('wzCount'), b = document.getElementById('wzNext');
    if (!c) return; c.textContent = n ? `${n} ${n === 1 ? 'opción' : 'opciones'}` : '—'; b.disabled = !n;
  }
  function render(focus) {
    const s = step();
    root.innerHTML = stepper() + `<div class="wz-panel">${s === 1 ? step1() : s === 2 ? step2() : step3()}</div>`;
    if (s === 2) updateBar();
    if (focus) { root.querySelector('.stepper').scrollIntoView({ behavior: 'smooth', block: 'start' }); const t = root.querySelector('.wz-title'); if (t) t.focus({ preventScroll: true }); }
  }

  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t || !root.contains(t)) return;
    if (t.dataset.go) { const n = +t.dataset.go; go({ type: n >= 2 ? state.type : null, opts: n >= 2 ? state.opts : [], chip: state.chip, model: state.model, review: false }); return; }
    if (t.dataset.type) { go({ type: t.dataset.type }); return; }
    if (t.dataset.opt !== undefined) {
      const i = +t.dataset.opt, k = state.opts.indexOf(i);
      if (k >= 0) state.opts.splice(k, 1); else state.opts.push(i);
      t.classList.toggle('is-on', k < 0); t.setAttribute('aria-pressed', String(k < 0));
      history.replaceState(snap(), ''); updateBar(); return;
    }
    if (t.dataset.chip !== undefined) {
      state.chip = state.chip === t.dataset.chip ? '' : t.dataset.chip;
      root.querySelectorAll('.chip').forEach(c => c.classList.toggle('is-on', c.dataset.chip === state.chip));
      history.replaceState(snap(), ''); return;
    }
    if (t.dataset.act === 'next' && state.opts.length) { state.opts.sort((a, b) => a - b); go(Object.assign({}, state, { review: true })); return; }
    if (t.dataset.act === 'quote') window.AosQuote ? window.AosQuote.open(C.modalType, prefill()) : (location.href = 'index.html#contact');
  });
  root.addEventListener('input', e => { if (e.target.id === 'wzModel') { state.model = e.target.value; history.replaceState(snap(), ''); } });

  history.replaceState(snap(), '');
  render(false);
})();

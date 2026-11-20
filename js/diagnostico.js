// Página de diagnóstico: envía una prueba real y explica la respuesta.
(() => {
  const cfg = window.AOS_CONFIG || {};
  const out = document.getElementById('diagOut'), box = document.getElementById('diagCfg');
  if (!out || !box) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  box.innerHTML = `<dt>Correo destino</dt><dd>${esc(cfg.email || '(vacío)')}</dd><dt>WhatsApp</dt><dd>+${esc(cfg.whatsapp || '(vacío)')}</dd><dt>Web3Forms</dt><dd>${cfg.web3formsKey ? 'clave configurada' : 'sin clave (solo se usa FormSubmit)'}</dd><dt>Página</dt><dd>${esc(location.protocol + '//' + location.host)}${location.protocol === 'file:' ? ' — ABIERTA DESDE EL DISCO: el envío será bloqueado' : ''}</dd>`;
  if (!cfg.web3formsKey) document.getElementById('diagW3').disabled = true;
  const sample = () => ({ service: 'Prueba de diagnóstico', name: 'Prueba AOS', email: '', phone: '', details: 'Mensaje de prueba enviado desde diagnostico-formulario.html el ' + new Date().toLocaleString('es-ES') });

  function explain(r) {
    if (r.status === 0) return `PROBLEMA: no se pudo contactar con ${r.provider} (${r.detail}).\n  · Si abriste el HTML desde tu disco (file://), el navegador lo bloquea: prueba en la web publicada.\n  · Si ya estás en la web publicada, revisa bloqueadores de anuncios/privacidad o la red.`;
    if (r.ok) return `OK: ${r.provider} ACEPTÓ el mensaje.\n  · Si no lo ves en 1-2 minutos: mira Spam y Promociones.` + (r.provider === 'FormSubmit' ? '\n  · Primera vez con FormSubmit: busca su correo con el botón de activar y púlsalo; los mensajes anteriores se entregan al activar.' : '');
    if (/activ/i.test(r.detail)) return `FALTA ACTIVAR: ${r.provider} dice que el formulario necesita activación.\n  · Abre el correo de FormSubmit (mira Spam) y pulsa el botón de activar. Después vuelve a probar.`;
    return `${r.provider} respondió con un error: ${r.detail}`;
  }
  const show = (txt) => { out.textContent = txt; };
  async function run(fn, label) {
    show('Enviando prueba por ' + label + '…');
    let r;
    try { r = await fn(sample()); } catch (e) { r = { provider: label, ok: false, status: 0, detail: e && e.name === 'AbortError' ? 'sin respuesta a tiempo' : 'sin conexión', raw: null }; }
    show(explain(r) + '\n\n--- respuesta técnica ---\nHTTP ' + r.status + '\n' + JSON.stringify(r.raw, null, 2));
  }
  document.getElementById('diagFS').addEventListener('click', () => run(window.AosSend.viaFormSubmit, 'FormSubmit'));
  document.getElementById('diagW3').addEventListener('click', () => run(window.AosSend.viaWeb3Forms, 'Web3Forms'));
  document.getElementById('diagAll').addEventListener('click', async () => {
    show('Enviando prueba como lo hace la web…');
    const r = await window.AosSend.send(sample());
    show((r.ok ? 'OK: enviado por ' + r.provider + '.' : 'NO SE PUDO ENVIAR.') + '\n\n' + r.tried.map(t => '· ' + explain(t)).join('\n\n'));
  });
})();

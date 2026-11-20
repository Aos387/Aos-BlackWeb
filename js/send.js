// Envío de solicitudes por correo: Web3Forms (si hay clave) y FormSubmit como alternativa.
// Lo usan main.js (formularios) y diagnostico-formulario.html (pruebas).
(() => {
  const cfg = () => window.AOS_CONFIG || {};

  async function post(url, body, timeout = 15000) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeout);
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal });
      const data = await res.json().catch(() => ({}));
      return { res, data };
    } finally { clearTimeout(timer); }
  }
  const asText = f => ['Servicio: ' + f.service, 'Nombre: ' + f.name, 'Correo: ' + (f.email || 'No indicado'), 'Teléfono: ' + (f.phone || 'No indicado'), '', 'Mensaje:', f.details, '', 'Enviado desde: ' + location.href].join('\n');
  const msgOf = d => (d && (d.message || (d.body && d.body.message))) || '';

  async function viaFormSubmit(f) {
    const payload = { _subject: '[AOS BlackWeb] ' + f.service + ' — ' + f.name, _template: 'table', _captcha: 'false',
      Nombre: f.name, Servicio: f.service, Telefono: f.phone || 'No indicado', Mensaje: f.details, Pagina: location.href };
    if (f.email) payload.email = f.email;               // FormSubmit lo usa como "responder a"
    const { res, data } = await post('https://formsubmit.co/ajax/' + cfg().email, payload);
    return { provider: 'FormSubmit', ok: res.ok && (data.success === true || data.success === 'true'), status: res.status, detail: msgOf(data) || ('HTTP ' + res.status), raw: data };
  }
  async function viaWeb3Forms(f) {
    const payload = { access_key: cfg().web3formsKey, subject: '[AOS BlackWeb] ' + f.service + ' — ' + f.name, from_name: 'AOS BlackWeb', name: f.name, phone: f.phone || 'No indicado', message: asText(f), botcheck: '' };
    if (f.email) payload.email = f.email;
    const { res, data } = await post('https://api.web3forms.com/submit', payload);
    return { provider: 'Web3Forms', ok: res.ok && data.success === true, status: res.status, detail: msgOf(data) || ('HTTP ' + res.status), raw: data };
  }

  async function send(f) {
    const order = cfg().web3formsKey ? [viaWeb3Forms, viaFormSubmit] : [viaFormSubmit];
    const tried = [];
    for (const fn of order) {
      let r;
      try { r = await fn(f); }
      catch (e) { r = { provider: fn === viaWeb3Forms ? 'Web3Forms' : 'FormSubmit', ok: false, status: 0, detail: e && e.name === 'AbortError' ? 'el servicio no respondió a tiempo' : 'no se pudo conectar con el servicio', raw: null }; }
      tried.push(r);
      if (r.ok) return { ok: true, provider: r.provider, tried };
    }
    console.warn('[AOS] No se pudo enviar la solicitud:', tried);
    return { ok: false, tried };
  }
  window.AosSend = { send, viaFormSubmit, viaWeb3Forms };
})();

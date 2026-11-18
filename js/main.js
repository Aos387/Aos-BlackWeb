(() => {
  // ---- Destino de las solicitudes
  const CONTACT_EMAIL = 'errroraos404@gmail.com';     // el formulario llega a este correo (vía FormSubmit)
  const WHATSAPP_NUMBER = '34632180091';              // WhatsApp +34 632 18 00 91
  const ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;
  const modal = document.getElementById('requestModal');
  const form = document.getElementById('requestForm');
  const result = document.getElementById('formResult');
  const title = document.getElementById('modalTitle');
  const description = document.getElementById('modalDescription');
  const typeInput = document.getElementById('requestType');
  const toast = document.getElementById('toast');
  const menu = document.querySelector('.top-nav');
  const menuToggle = document.getElementById('mobileMenuToggle');

  const serviceInfo = {
    web: ['Solicitar página web', 'Cuéntanos cómo imaginas tu web, qué secciones necesitas y cuál es el objetivo del proyecto.'],
    app: ['Solicitar aplicación a medida', 'Describe tu negocio, qué tareas quieres resolver y qué funciones debería incluir la aplicación.'],
    software: ['Catálogo de software AOS', 'Consulta disponibilidad, características y novedades de las aplicaciones desarrolladas por AOS.'],
    digital: ['Consultar solución digital', 'Explícanos qué proceso quieres mejorar, automatizar o digitalizar.'],
    'mobile-repair': ['Reparación de móviles', 'Indica marca, modelo, avería y cualquier detalle relevante del dispositivo.'],
    'computer-repair': ['Reparación de ordenadores', 'Indica si es portátil o sobremesa, modelo/equipo, síntomas y cuándo comenzó el problema.'],
    maintenance: ['Mantenimiento técnico', 'Describe el equipo o instalación y el mantenimiento que necesitas.'],
    'buy-phone': ['Consultar terminales disponibles', 'Indica qué modelo o características estás buscando. La disponibilidad se confirmará manualmente.'],
    'sell-phone': ['Vender mi móvil a AOS', 'Indica marca, modelo, capacidad, estado estético, funcionamiento y reparaciones previas.'],
    valuation: ['Solicitar tasación de móvil', 'Facilita marca, modelo, capacidad, estado, salud de batería (si procede) y accesorios incluidos.'],
    'phone-repair-order': ['Solicitar esta reparación', 'Revisa el resumen, añade lo que quieras y te confirmamos precio y plazo.'],
    'phone-repair-quote': ['Pide tu presupuesto de reparación', 'Cuéntanos qué le pasa a tu móvil y te preparamos un presupuesto personalizado.'],
    'computer-quote': ['Pide tu presupuesto de reparación', 'Revisa el resumen y añade lo que quieras. Te preparamos un presupuesto personalizado para tu equipo.'],
    'maintenance-quote': ['Pide tu presupuesto de mantenimiento', 'Revisa el resumen y añade lo que quieras. Te preparamos un presupuesto personalizado.'],
    'techs-quote': ['Pide tu presupuesto', 'Cuéntanos tu proyecto y te preparamos un presupuesto a medida.'],
    general: ['Contactar con AOS', 'Cuéntanos brevemente qué necesitas y a qué división corresponde tu consulta.']
  };

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  function openModal(type = 'general', prefill = '') {
    const info = serviceInfo[type] || serviceInfo.general;
    title.textContent = info[0];
    description.textContent = info[1];
    typeInput.value = type;
    form.hidden = false;
    result.hidden = true;
    form.reset();
    typeInput.value = type;
    if (prefill) form.elements.details.value = prefill;
    setBusy(false);
    checkContact();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.querySelector('input[name="name"]').focus(), 50);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-service]').forEach(button => {
    button.addEventListener('click', () => openModal(button.dataset.service, button.dataset.prefill || ''));
  });
  window.AosQuote = { open: openModal };           // lo usan los asistentes de las subpáginas
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });

  // ---- Envío real: correo (FormSubmit) y WhatsApp (enlace wa.me con el mensaje ya escrito)
  const sendBtn = document.getElementById('sendMail');
  const waBtn = document.getElementById('sendWa');
  const resultTitle = document.getElementById('resultTitle');
  const resultText = document.getElementById('resultText');
  const resultWa = document.getElementById('resultWa');
  const resultMail = document.getElementById('resultMail');
  const sendLabel = sendBtn.innerHTML;

  function setBusy(busy) {
    sendBtn.disabled = busy; waBtn.disabled = busy;
    sendBtn.innerHTML = busy ? 'ENVIANDO… <span>…</span>' : sendLabel;
  }
  // se necesita al menos un correo o un teléfono para poder responder
  function checkContact() {
    const missing = !form.elements.email.value.trim() && !form.elements.phone.value.trim();
    form.elements.email.setCustomValidity(missing ? 'Indica un correo o un teléfono para poder responderte.' : '');
  }
  form.addEventListener('input', checkContact);

  function fields() {
    const d = new FormData(form);
    const type = d.get('requestType');
    return {
      service: serviceInfo[type]?.[0] || 'Consulta general',
      name: String(d.get('name') || '').trim(),
      email: String(d.get('email') || '').trim(),
      phone: String(d.get('phone') || '').trim(),
      details: String(d.get('details') || '').trim(),
      honey: d.get('_honey')
    };
  }
  function messageText(f) {
    return ['Hola, soy ' + f.name + '.', 'Servicio: ' + f.service, '', f.details, '',
      'Contacto: ' + [f.email, f.phone].filter(Boolean).join(' · '), '(Enviado desde la web AOS BlackWeb)'].join('\n');
  }
  const waLink = f => 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(messageText(f));
  const mailLink = f => 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('[AOS BlackWeb] ' + f.service + ' — ' + f.name) + '&body=' + encodeURIComponent(messageText(f));

  function showResult(kind, f) {
    form.hidden = true; result.hidden = false;
    resultWa.href = waLink(f);
    resultMail.hidden = kind !== 'error';
    if (kind === 'ok') {
      resultTitle.textContent = 'Solicitud enviada.';
      resultText.textContent = 'Hemos recibido tu solicitud y te responderemos lo antes posible. Si es urgente, también puedes escribirnos por WhatsApp.';
    } else if (kind === 'wa') {
      resultTitle.textContent = 'WhatsApp abierto.';
      resultText.textContent = 'Te hemos abierto WhatsApp con el mensaje ya escrito. Solo tienes que pulsar enviar. Si no se ha abierto, usa el botón de abajo.';
    } else {
      resultTitle.textContent = 'No hemos podido enviarla.';
      resultText.textContent = 'Ha fallado el envío automático. Puedes mandarla por correo o por WhatsApp con un clic: el mensaje ya va escrito.';
      resultMail.href = mailLink(f);
    }
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    checkContact();
    if (!form.reportValidity()) return;
    const f = fields();
    if (f.honey) { showResult('ok', f); return; }          // anti-bots: no se envía nada
    setBusy(true);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    try {
      const payload = {
        _subject: '[AOS BlackWeb] ' + f.service + ' — ' + f.name,
        _template: 'table', _captcha: 'false',
        Nombre: f.name, Servicio: f.service, Telefono: f.phone || 'No indicado', Mensaje: f.details, Pagina: location.href
      };
      if (f.email) payload.email = f.email;                // FormSubmit lo usa como "responder a"
      const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload), signal: ctrl.signal });
      const data = await res.json().catch(() => ({}));
      showResult(res.ok && (data.success === true || data.success === 'true') ? 'ok' : 'error', f);
    } catch {
      showResult('error', f);
    } finally {
      clearTimeout(timer);
      setBusy(false);
    }
  });

  waBtn.addEventListener('click', () => {
    if (!form.elements.name.reportValidity() || !form.elements.details.reportValidity()) return;
    const f = fields();
    window.open(waLink(f), '_blank', 'noopener');
    showResult('wa', f);
  });
  document.getElementById('resultClose').addEventListener('click', closeModal);

  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));

  document.getElementById('currentYear').textContent = new Date().getFullYear();

  const revealTargets = document.querySelectorAll('.division-card, .product-feature, .product-upcoming, .process-grid > div, .contact-section');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.dataset.reveal = '';
        requestAnimationFrame(() => entry.target.classList.add('revealed'));
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: .12 });
    revealTargets.forEach(el => revealObserver.observe(el));
  } else revealTargets.forEach(el => el.classList.add('revealed'));
})();

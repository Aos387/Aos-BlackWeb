(() => {
  const modal = document.getElementById('requestModal');
  const form = document.getElementById('requestForm');
  const result = document.getElementById('formResult');
  const summary = document.getElementById('requestSummary');
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
    general: ['Contactar con AOS', 'Cuéntanos brevemente qué necesitas y a qué división corresponde tu consulta.']
  };

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  function openModal(type = 'general') {
    const info = serviceInfo[type] || serviceInfo.general;
    title.textContent = info[0];
    description.textContent = info[1];
    typeInput.value = type;
    form.hidden = false;
    result.hidden = true;
    form.reset();
    typeInput.value = type;
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
    button.addEventListener('click', () => openModal(button.dataset.service));
  });
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = [
      'SOLICITUD — AOS BLACKWEB',
      'División/servicio: ' + (serviceInfo[data.get('requestType')]?.[0] || 'Consulta general'),
      'Nombre: ' + data.get('name'),
      'Correo: ' + data.get('email'),
      'Teléfono: ' + (data.get('phone') || 'No indicado'),
      '',
      'DETALLES:',
      data.get('details'),
      '',
      'Solicitud preparada desde la web de AOS BlackWeb.'
    ];
    summary.value = lines.join('\n');
    form.hidden = true;
    result.hidden = false;
  });

  document.getElementById('copyRequest').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(summary.value);
      showToast('Solicitud copiada al portapapeles.');
    } catch {
      summary.select();
      document.execCommand('copy');
      showToast('Solicitud copiada.');
    }
  });

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

  const revealTargets = document.querySelectorAll('.division-card, .product-feature, .process-grid > div, .contact-section');
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

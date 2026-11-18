// Inyecta el formulario de solicitud (modal) y el aviso (toast) en las subpáginas.
// Así cada subpágina nueva solo necesita cargar este archivo + main.js.
(() => {
  if (document.getElementById('requestModal')) return;
  document.body.insertAdjacentHTML('beforeend', `
  <div class="modal-backdrop" id="requestModal" aria-hidden="true">
    <section class="request-modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <button class="modal-close" id="modalClose" aria-label="Cerrar">×</button>
      <div class="modal-kicker">AOS / REQUEST SYSTEM</div>
      <h2 id="modalTitle">Iniciar solicitud</h2>
      <p id="modalDescription">Déjanos tus datos y te respondemos por correo o por WhatsApp.</p>
      <form id="requestForm" novalidate>
        <input type="hidden" id="requestType" name="requestType">
        <input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <label>Nombre <input name="name" autocomplete="name" required placeholder="Tu nombre"></label>
        <label>Correo electrónico <input name="email" type="email" autocomplete="email" placeholder="tu@correo.com"></label>
        <label>Teléfono / WhatsApp <input name="phone" type="tel" autocomplete="tel" placeholder="+34 ..."></label>
        <p class="form-hint">Indica al menos un correo o un teléfono para que podamos responderte.</p>
        <label id="deviceLabel">Detalles de la solicitud <textarea name="details" rows="6" required placeholder="Describe brevemente lo que necesitas..."></textarea></label>
        <div class="modal-actions">
          <button class="button button-primary" type="submit" id="sendMail">ENVIAR SOLICITUD <span>↗</span></button>
          <button class="button button-ghost" type="button" id="sendWa">POR WHATSAPP <span>↗</span></button>
          <button class="button button-ghost" type="button" id="modalCancel">CANCELAR</button>
        </div>
      </form>
      <div class="form-result" id="formResult" hidden>
        <strong id="resultTitle">Solicitud enviada.</strong>
        <p id="resultText"></p>
        <div class="modal-actions">
          <a class="button button-primary" id="resultWa" href="#" target="_blank" rel="noopener">ABRIR WHATSAPP <span>↗</span></a>
          <a class="button button-ghost" id="resultMail" href="#" hidden>ENVIAR POR CORREO <span>↗</span></a>
          <button class="button button-ghost" type="button" id="resultClose">CERRAR</button>
        </div>
      </div>
    </section>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`);
})();

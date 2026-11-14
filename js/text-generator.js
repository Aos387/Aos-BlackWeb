(() => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+-_';
  const originals = new WeakMap();
  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  function generate(element) {
    if (element.dataset.generated === 'true') return;
    const finalText = element.dataset.text || element.textContent.trim();
    if (!finalText) return;
    originals.set(element, finalText);
    element.dataset.generated = 'true';
    element.classList.add('is-generating');
    const duration = Math.min(1500, Math.max(450, finalText.length * 22));
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const revealCount = Math.floor(progress * finalText.length);
      let output = '';
      for (let i = 0; i < finalText.length; i++) {
        const c = finalText[i];
        if (i < revealCount || c === ' ') output += c;
        else output += randomChar();
      }
      element.textContent = output;
      if (progress < 1) requestAnimationFrame(frame);
      else {
        element.textContent = finalText;
        element.classList.remove('is-generating');
      }
    }
    requestAnimationFrame(frame);
  }

  function init() {
    const targets = document.querySelectorAll('.glitch-text');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(generate);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          generate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    targets.forEach(target => observer.observe(target));
  }
  window.addEventListener('DOMContentLoaded', init, { once: true });
})();

/* ============================================================
   Studio Dentistico — script unico
   Header/Footer sono generati una sola volta da qui invece di
   essere duplicati in ogni pagina: meno HTML da mantenere,
   meno rischio di incoerenze, meno token per ogni modifica futura.
   ============================================================ */

(function () {
  const PAGES = [
    { href: 'index.html', label: 'Home' },
    { href: 'chi-siamo.html', label: 'Chi siamo' },
    { href: 'servizi.html', label: 'Servizi' },
    { href: 'contatti.html', label: 'Contatti' }
  ];

  const current = location.pathname.split('/').pop() || 'index.html';

  function navLinks(includeHome) {
    return PAGES.filter(p => includeHome || p.href !== 'index.html')
      .map(p => `<li><a href="${p.href}"${p.href === current ? ' aria-current="page" class="active"' : ''}>${p.label}</a></li>`)
      .join('');
  }

  const HEADER_HTML = `
    <div class="nav wrap">
      <a class="logo" href="index.html">Studio [Nome]</a>
      <button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="mainMenu" aria-label="Apri il menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="menu" id="mainMenu">${navLinks(false)}</ul>
      <div class="nav-actions">
        <a class="tel-link" href="tel:+39000000000" aria-label="Chiama lo studio">📞 +39 000 000 0000</a>
        <a class="btn" href="contatti.html">Prenota visita</a>
      </div>
    </div>`;

  const FOOTER_FULL_HTML = `
    <div class="wrap">
      <div>
        <h4>Studio Dentistico [Nome]</h4>
        <p>Via [—], [Città] — P.IVA [—]</p>
        <p>Direttore Sanitario: Dott. [Nome Cognome], Albo Odontoiatri n. [—]</p>
        <div class="trust-row" aria-hidden="true">
          <span>★★★★★ 4.9/5 su Google</span>
        </div>
      </div>
      <div>
        <h4>Link utili</h4>
        <p><a href="chi-siamo.html">Chi siamo</a></p>
        <p><a href="servizi.html">Servizi</a></p>
        <p><a href="contatti.html">Contatti</a></p>
      </div>
      <div>
        <h4>Legale</h4>
        <p><a href="privacy-policy.html">Privacy Policy</a></p>
        <p><a href="cookie-policy.html">Cookie Policy</a></p>
      </div>
    </div>
    <div class="wrap legal">
      Le prestazioni sono eseguite da odontoiatri abilitati iscritti all'Ordine. © <span id="year"></span> Studio Dentistico [Nome]. Tutti i diritti riservati.
    </div>`;

  const FOOTER_SIMPLE_HTML = `<div class="wrap legal">© <span id="year"></span> Studio Dentistico [Nome].</div>`;

  function injectPartials() {
    const headerSlot = document.getElementById('site-header');
    if (headerSlot) headerSlot.outerHTML = `<header>${HEADER_HTML}</header>`;

    const footerSlot = document.getElementById('site-footer');
    if (footerSlot) {
      const simple = footerSlot.dataset.variant === 'simple';
      const html = simple ? FOOTER_SIMPLE_HTML : FOOTER_FULL_HTML;
      footerSlot.outerHTML = `<footer>${html}</footer>`;
    }

    document.querySelectorAll('#year').forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mainMenu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  function initFaq() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-q');
      q.addEventListener('click', () => {
        const isOpen = item.classList.toggle('open');
        q.setAttribute('aria-expanded', String(isOpen));
      });
    });
  }

  function initCookieBanner() {
    const KEY = 'cookie-consent';
    if (localStorage.getItem(KEY)) return;
    const bar = document.createElement('div');
    bar.className = 'cookie-banner';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Informativa cookie');
    bar.innerHTML = `
      <p>Usiamo cookie tecnici per il funzionamento del sito. Consulta la <a href="cookie-policy.html">Cookie Policy</a>.</p>
      <button class="btn" id="cookieAccept">Accetta</button>`;
    document.body.appendChild(bar);
    document.getElementById('cookieAccept').addEventListener('click', () => {
      localStorage.setItem(KEY, '1');
      bar.remove();
    });
  }

  function initStickyMobileCta() {
    if (current === 'contatti.html') return; // già sulla pagina di contatto
    const cta = document.createElement('div');
    cta.className = 'sticky-cta';
    cta.innerHTML = `
      <a class="btn btn-block" href="tel:+39000000000">📞 Chiama ora</a>
      <a class="btn btn-ghost btn-block" href="contatti.html">Prenota online</a>`;
    document.body.appendChild(cta);
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectPartials();
    initMobileMenu();
    initFaq();
    initCookieBanner();
    initStickyMobileCta();
  });
})();

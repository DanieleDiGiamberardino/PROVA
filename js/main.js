/* ============================================================
   Studio Dentistico — script unico
   Header/Footer sono generati una sola volta da qui invece di
   essere duplicati in ogni pagina: meno HTML da mantenere,
   meno rischio di incoerenze, meno token per ogni modifica futura.
   ============================================================ */

/* ------------------------------------------------------------
   CONFIGURAZIONE STUDIO — unico punto da editare.
   Cambia questi valori per aggiornare nome, città, telefono ed
   email ovunque compaiano nel sito (testi, title, meta, link
   tel:/mailto:, dati strutturati), senza toccare i file .html.
   ------------------------------------------------------------ */
const SITE_CONFIG = {
  nome: '[Nome]',
  citta: '[Città]',
  telefono: '+39 000 000 0000',   // formato visualizzato
  telefonoHref: '+39000000000',   // stesso numero, senza spazi, per i link tel:
  email: 'info@studio.it',
  // Orari per l'indicatore "Aperto ora / Chiuso" in tempo reale.
  // Chiave 0=domenica...6=sabato. null = chiuso quel giorno.
  // Cambia solo qui per aggiornare l'indicatore ovunque compaia.
  orari: {
    0: null,
    1: ['09:00', '19:00'],
    2: ['09:00', '19:00'],
    3: ['09:00', '19:00'],
    4: ['09:00', '19:00'],
    5: ['09:00', '19:00'],
    6: null // sabato: solo su appuntamento, non conteggiato come "aperto"
  }
};

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

  /* Sostituisce [Nome] / [Città] / numero di telefono / email in tutto
     il documento (title, meta, JSON-LD, testo visibile, link tel:/mailto:)
     leggendo i valori da SITE_CONFIG. Finché SITE_CONFIG non è compilato
     con i dati reali, i placeholder restano visibili come promemoria. */
  function applyConfig() {
    const c = SITE_CONFIG;
    const rules = [
      [/\[Nome\]/g, c.nome],
      [/\[Città\]/g, c.citta],
      [/\+39\s?000\s?000\s?0000/g, c.telefono],
      [/info@studio\.it/g, c.email]
    ];
    const replace = (str) => rules.reduce((s, [re, val]) => s.replace(re, val), str);

    document.title = replace(document.title);
    document.querySelectorAll('meta[name="description"], meta[property^="og:"]').forEach(m => {
      if (m.content) m.content = replace(m.content);
    });
    document.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
      s.textContent = replace(s.textContent);
    });

    // Testo visibile: TreeWalker sui nodi di testo, non tocca listener/markup.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const replaced = replace(node.nodeValue);
      if (replaced !== node.nodeValue) node.nodeValue = replaced;
    }

    document.querySelectorAll('a[href^="tel:"]').forEach(a => { a.href = 'tel:' + c.telefonoHref; });
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => { a.href = 'mailto:' + c.email; });
  }

  /* Placeholder elegante al posto dell'icona di immagine rotta, finché
     le foto reali non vengono aggiunte in img/. Zero manutenzione: si
     applica automaticamente a ogni <img> che fallisce il caricamento. */
  function initImageFallback() {
    const swap = (img) => {
      const ph = document.createElement('div');
      ph.className = 'img-placeholder';
      ph.style.aspectRatio = getComputedStyle(img).aspectRatio;
      ph.textContent = img.alt || 'Immagine in arrivo';
      img.replaceWith(ph);
    };
    document.querySelectorAll('img').forEach(img => {
      // Le img senza loading="lazy" partono già durante il parsing HTML,
      // quindi l'errore può essere scattato prima che questo script giri:
      // in quel caso img.complete è true e naturalWidth resta a 0.
      if (img.complete) {
        if (img.naturalWidth === 0) swap(img);
      } else {
        img.addEventListener('error', () => swap(img), { once: true });
      }
    });
  }

  /* Favicon e meta condivise iniettate qui: un solo punto da aggiornare
     invece di ripeterle in ogni <head>. */
  function injectHeadExtras() {
    const head = document.head;
    if (!document.querySelector('link[rel="icon"]')) {
      const icon = document.createElement('link');
      icon.rel = 'icon';
      icon.href = 'data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
        '<rect width="100" height="100" rx="20" fill="%230B5E59"/>' +
        '<text x="50" y="66" font-size="54" text-anchor="middle" fill="%23fff" font-family="Georgia,serif">S</text>' +
        '</svg>'
      );
      head.appendChild(icon);
    }
    if (!document.querySelector('meta[name="twitter:card"]')) {
      const tw = document.createElement('meta');
      tw.name = 'twitter:card';
      tw.content = 'summary_large_image';
      head.appendChild(tw);
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && !document.querySelector('meta[property="og:url"]')) {
      const ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      ogUrl.content = canonical.href;
      head.appendChild(ogUrl);
    }
  }

  const DAY_NAMES = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

  function getOpenStatus() {
    const now = new Date();
    const day = now.getDay();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };

    const today = SITE_CONFIG.orari[day];
    if (today && nowMin >= toMin(today[0]) && nowMin < toMin(today[1])) {
      return { open: true, text: `Aperto ora · chiude alle ${today[1]}` };
    }
    if (today && nowMin < toMin(today[0])) {
      return { open: false, text: `Chiuso ora · apre oggi alle ${today[0]}` };
    }
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      const hours = SITE_CONFIG.orari[d];
      if (hours) {
        return { open: false, text: `Chiuso ora · riapre ${DAY_NAMES[d]} alle ${hours[0]}` };
      }
    }
    return { open: false, text: 'Chiuso' };
  }

  /* Riempie ogni <span class="open-status-slot"></span> presente in
     pagina con il badge Aperto/Chiuso calcolato in tempo reale
     dall'orologio del visitatore, in base a SITE_CONFIG.orari. */
  function initOpenStatus() {
    const slots = document.querySelectorAll('.open-status-slot');
    if (!slots.length) return;
    const status = getOpenStatus();
    slots.forEach(slot => {
      slot.textContent = status.text;
      slot.className = 'open-status-slot open-status ' + (status.open ? 'open' : 'closed');
    });
  }

  /* Evidenzia nella sotto-nav ad ancore (.section-nav) il link della
     sezione attualmente visibile, mentre l'utente scorre la pagina.
     Non fa nulla sulle pagine che non hanno una .section-nav. */
  function initSectionNav() {
    const nav = document.querySelector('.section-nav');
    if (!nav) return;
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const sections = links
      .map(a => document.getElementById(a.getAttribute('href').slice(1)))
      .filter(Boolean);
    if (!sections.length) return;

    const setActive = (id) => {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-140px 0px -60% 0px', threshold: 0 });

    sections.forEach(s => observer.observe(s));
  }

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
    injectHeadExtras();
    injectPartials();
    initStickyMobileCta();
    applyConfig(); // dopo aver creato tutto l'HTML, così sostituisce anche header/footer/CTA
    initMobileMenu();
    initFaq();
    initCookieBanner();
    initImageFallback();
    initOpenStatus();
    initSectionNav();
  });
})();

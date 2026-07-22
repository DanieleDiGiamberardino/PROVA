/* ============================================================
   Studio Dentistico — script unico
   Header/Footer sono generati una sola volta da qui invece di
   essere duplicati in ogni pagina: meno HTML da mantenere,
   meno rischio di incoerenze, meno token per ogni modifica futura.
   ============================================================ */

/* ------------------------------------------------------------
   CONFIGURAZIONE STUDIO — unico punto da editare.
   "nome" ed "email" sono condivisi da tutto il gruppo. L'array
   "sedi" contiene le 3 sedi: aggiungerne, rimuoverne o modificarne
   una qui aggiorna automaticamente homepage, pagina Sedi, footer,
   contatti, badge Aperto/Chiuso e dati strutturati — senza mai
   toccare i file .html.
   ------------------------------------------------------------ */
const SITE_CONFIG = {
  nome: '[Nome]',       // nome del gruppo/brand, es. "Studio Dentistico Rossi"
  email: 'info@studio.it',
  sedi: [
    {
      slug: 'sede-1',
      nome: 'Sede Roma [Zona 1]',
      citta: 'Roma',
      indirizzo: 'Via [—], Roma',
      telefono: '+39 000 000 0001',
      telefonoHref: '+390000000001',
      calendlyUrl: 'https://calendly.com/studio-nome/sede-1',
      orari: { 0: null, 1: ['09:00', '19:00'], 2: ['09:00', '19:00'], 3: ['09:00', '19:00'], 4: ['09:00', '19:00'], 5: ['09:00', '19:00'], 6: null }
    },
    {
      slug: 'sede-2',
      nome: 'Sede Roma [Zona 2]',
      citta: 'Roma',
      indirizzo: 'Via [—], Roma',
      telefono: '+39 000 000 0002',
      telefonoHref: '+390000000002',
      calendlyUrl: 'https://calendly.com/studio-nome/sede-2',
      orari: { 0: null, 1: ['09:00', '18:00'], 2: ['09:00', '18:00'], 3: ['09:00', '18:00'], 4: ['09:00', '18:00'], 5: ['09:00', '18:00'], 6: null }
    },
    {
      slug: 'sede-3',
      nome: 'Sede Corcolle',
      citta: 'Corcolle',
      indirizzo: 'Via [—], Corcolle (Roma)',
      telefono: '+39 000 000 0003',
      telefonoHref: '+390000000003',
      calendlyUrl: 'https://calendly.com/studio-nome/sede-3',
      orari: { 0: null, 1: null, 2: ['09:00', '18:00'], 3: ['09:00', '18:00'], 4: ['09:00', '18:00'], 5: ['09:00', '18:00'], 6: ['09:00', '13:00'] }
    }
  ],
  /* Numero/i di reperibilità per le urgenze fuori orario, legati ai
     medici in turno e non a una sede specifica (un paziente in
     urgenza chiama il medico reperibile, non un centralino chiuso).
     "contatti" può avere 1 o più voci: con 2 medici come ora si
     mostrano entrambi; aggiungerne un terzo in futuro basta ad
     aggiornare ovunque il numero comparisce. */
  emergenze: {
    nota: 'Per urgenze odontoiatriche fuori dall\'orario di apertura, chiama direttamente il medico reperibile.',
    contatti: [
      { nome: 'Dott. [Nome Cognome]', telefono: '+39 000 000 0004', telefonoHref: '+390000000004' },
      { nome: 'Dott.ssa [Nome Cognome]', telefono: '+39 000 000 0005', telefonoHref: '+390000000005' }
    ]
  }
};

(function () {
  const PAGES = [
    { href: 'index.html', label: 'Home' },
    { href: 'chi-siamo.html', label: 'Chi siamo' },
    { href: 'servizi.html', label: 'Servizi' },
    { href: 'sedi.html', label: 'Sedi' },
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
        <p>P.IVA [—]</p>
        <p>Direttore Sanitario: Dott. [Nome Cognome], Albo Odontoiatri n. [—]</p>
        <div class="trust-row">
          <span>★★★★★ [—]/5 su Google ([—] recensioni) — <em>dato reale da inserire prima della pubblicazione</em></span>
        </div>
      </div>
      <div>
        <h4>Le nostre sedi</h4>
        <div id="footerSedi"></div>
      </div>
      <div>
        <h4>Link utili</h4>
        <p><a href="chi-siamo.html">Chi siamo</a></p>
        <p><a href="servizi.html">Servizi</a></p>
        <p><a href="sedi.html">Sedi</a></p>
        <p><a href="contatti.html">Contatti</a></p>
        <p><a href="privacy-policy.html">Privacy Policy</a></p>
        <p><a href="cookie-policy.html">Cookie Policy</a></p>
        <p><a href="#" id="manageCookies">Gestisci preferenze cookie</a></p>
      </div>
    </div>
    <div class="wrap legal">
      Le prestazioni sono eseguite da odontoiatri abilitati iscritti all'Ordine. © <span id="year"></span> Studio Dentistico [Nome]. Tutti i diritti riservati.
    </div>`;

  const FOOTER_SIMPLE_HTML = `<div class="wrap legal">© <span id="year"></span> Studio Dentistico [Nome].</div>`;

  /* "Milano, Roma e Napoli" invece di "Milano, Roma, Napoli" */
  function joinNames(arr) {
    if (arr.length <= 1) return arr.join('');
    return arr.slice(0, -1).join(', ') + ' e ' + arr[arr.length - 1];
  }

  /* Sostituisce [Nome] / email in tutto il documento (title, meta,
     JSON-LD, testo visibile, link mailto:) e il telefono generico
     con quello della sede principale (SITE_CONFIG.sedi[0]). I link
     tel: con un attributo data-sede="slug" vengono invece collegati
     al numero di quella specifica sede: così un solo numero "vetrina"
     compare in header/footer, ma ogni sede ha il proprio nella pagina
     Sedi. */
  function applyConfig() {
    const c = SITE_CONFIG;
    const principale = c.sedi[0];
    const rules = [
      [/\[Nome\]/g, c.nome],
      [/\[Città\]/g, joinNames([...new Set(c.sedi.map(s => s.citta))])],
      [/\+39\s?000\s?000\s?0000/g, principale.telefono],
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

    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
      if (a.dataset.emergenza) {
        const primo = c.emergenze && c.emergenze.contatti && c.emergenze.contatti[0];
        if (primo) { a.href = 'tel:' + primo.telefonoHref; return; }
      }
      const sede = c.sedi.find(s => s.slug === a.dataset.sede);
      a.href = 'tel:' + (sede ? sede.telefonoHref : principale.telefonoHref);
    });
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
  const CONSENT_KEY = 'cookie-consent'; // '1' accettato, '0' rifiutato, assente = non deciso
  const hasConsent = () => localStorage.getItem(CONSENT_KEY) === '1';

  /* Google Fonts trasmette l'IP del visitatore a Google ad ogni
     richiesta: viene caricato solo se l'utente ha accettato i cookie
     non tecnici (qui o in una visita precedente). Senza consenso il
     sito resta leggibile con i font di sistema già previsti come
     fallback in CSS (body{font-family:'Inter',sans-serif}, ecc.). */
  function loadGoogleFonts() {
    if (document.getElementById('gfonts-link')) return; // già caricati
    ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach((href, i) => {
      const l = document.createElement('link');
      l.rel = 'preconnect';
      l.href = href;
      if (i === 1) l.crossOrigin = '';
      document.head.appendChild(l);
    });
    const font = document.createElement('link');
    font.id = 'gfonts-link';
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(font);
  }

  function injectHeadExtras() {
    if (hasConsent()) loadGoogleFonts();
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
  const DAY_SHORT = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

  function getOpenStatus(orari) {
    const now = new Date();
    const day = now.getDay();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };

    const today = orari[day];
    if (today && nowMin >= toMin(today[0]) && nowMin < toMin(today[1])) {
      return { open: true, text: `Aperto ora · chiude alle ${today[1]}` };
    }
    if (today && nowMin < toMin(today[0])) {
      return { open: false, text: `Chiuso ora · apre oggi alle ${today[0]}` };
    }
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      const hours = orari[d];
      if (hours) {
        return { open: false, text: `Chiuso ora · riapre ${DAY_NAMES[d]} alle ${hours[0]}` };
      }
    }
    return { open: false, text: 'Chiuso' };
  }

  /* Trasforma l'oggetto orari {0..6:[apre,chiude]|null} in un'unica
     riga leggibile tipo "Lun–Ven 09:00–19:00, Sab 09:00–13:00",
     accorpando i giorni consecutivi con lo stesso orario. */
  function orariLabel(orari) {
    const order = [1, 2, 3, 4, 5, 6, 0];
    const groups = [];
    order.forEach(d => {
      const val = orari[d] ? orari[d].join('–') : null;
      const last = groups[groups.length - 1];
      if (last && last.val === val) last.days.push(d);
      else groups.push({ val, days: [d] });
    });
    return groups
      .filter(g => g.val)
      .map(g => {
        const span = g.days.length > 1
          ? `${DAY_SHORT[g.days[0]]}–${DAY_SHORT[g.days[g.days.length - 1]]}`
          : DAY_SHORT[g.days[0]];
        return `${span} ${g.val}`;
      })
      .join(', ') || 'Chiuso';
  }

  /* Riempie ogni <span class="open-status-slot"></span> presente in
     pagina con il badge Aperto/Chiuso calcolato in tempo reale
     dall'orologio del visitatore. Se lo slot ha data-sede="slug" usa
     gli orari di quella sede, altrimenti quelli della sede principale. */
  function initOpenStatus() {
    document.querySelectorAll('.open-status-slot').forEach(slot => {
      const sede = SITE_CONFIG.sedi.find(s => s.slug === slot.dataset.sede) || SITE_CONFIG.sedi[0];
      const status = getOpenStatus(sede.orari);
      slot.textContent = status.text;
      slot.className = 'open-status-slot open-status ' + (status.open ? 'open' : 'closed');
    });
  }

  /* Genera le card delle 3 sedi da SITE_CONFIG.sedi e le inserisce in
     ogni <div class="sedi-mini"> (versione compatta, per Home/Contatti)
     e <div class="sedi-full"> (versione completa, per la pagina Sedi).
     Aggiungere/togliere una sede in SITE_CONFIG basta a farla comparire
     ovunque, senza toccare l'HTML. */
  function renderSedi() {
    const c = SITE_CONFIG;

    const miniHtml = c.sedi.map(s => `
      <a class="sede-card-mini" href="sedi.html#${s.slug}">
        <h4>${s.nome}</h4>
        <p>${s.indirizzo}</p>
        <span class="open-status-slot" data-sede="${s.slug}"></span>
      </a>`).join('');
    document.querySelectorAll('.sedi-mini').forEach(el => { el.innerHTML = miniHtml; });

    const telHtml = c.sedi.map(s => `
      <p style="margin-bottom:8px"><strong>${s.nome}:</strong> <a href="tel:${s.telefonoHref}" data-sede="${s.slug}" style="color:var(--teal);text-decoration:underline">${s.telefono}</a></p>`).join('');
    document.querySelectorAll('.sedi-telefoni').forEach(el => { el.innerHTML = telHtml; });

    const fullHtml = c.sedi.map(s => `
      <div class="card sede-card" id="${s.slug}">
        <div class="eyebrow">Sede</div>
        <h2 style="margin:4px 0 14px">${s.nome}</h2>
        <p><strong>Indirizzo:</strong> ${s.indirizzo}</p>
        <p><strong>Telefono:</strong> <a href="tel:${s.telefonoHref}" data-sede="${s.slug}">${s.telefono}</a></p>
        <p><strong>Orari:</strong> ${orariLabel(s.orari)}</p>
        <p style="margin-top:10px"><span class="open-status-slot" data-sede="${s.slug}"></span></p>
        <div class="img-placeholder" style="margin:18px 0;min-height:200px">Mappa Google — ${s.nome} (iframe da integrare)</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <a class="btn" href="tel:${s.telefonoHref}" data-sede="${s.slug}">📞 Chiama questa sede</a>
          <a class="btn-ghost btn" href="contatti.html?sede=${s.slug}#bookingWidget">Prenota in questa sede</a>
        </div>
      </div>`).join('');
    document.querySelectorAll('.sedi-full').forEach(el => { el.innerHTML = fullHtml; });

    const footerSlot = document.getElementById('footerSedi');
    if (footerSlot) {
      footerSlot.innerHTML = c.sedi.map(s => `
        <p>${s.nome}<br><a href="tel:${s.telefonoHref}" data-sede="${s.slug}">${s.telefono}</a></p>`).join('');
    }
  }

  /* Dati strutturati (schema.org) per ogni sede: un blocco Dentist
     distinto per sede, così ciascuna può comparire separatamente nelle
     ricerche locali di Google per la propria città. Generati solo
     sulla pagina che contiene .sedi-full (sedi.html). */
  function injectSedeSchema() {
    if (!document.querySelector('.sedi-full')) return;
    SITE_CONFIG.sedi.forEach(s => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Dentist',
        name: `${SITE_CONFIG.nome} — ${s.nome}`,
        telephone: s.telefonoHref,
        address: {
          '@type': 'PostalAddress',
          streetAddress: s.indirizzo,
          addressLocality: s.citta,
          addressCountry: 'IT'
        },
        openingHours: Object.entries(s.orari)
          .filter(([, v]) => v)
          .map(([d, v]) => `${['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][d]} ${v[0]}-${v[1]}`),
        priceRange: '€€'
      });
      document.head.appendChild(script);
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

  /* Carica lo script esterno di Calendly una sola volta (non è più
     incluso staticamente nell'HTML: viene richiesto solo qui, quando
     serve davvero e solo se l'utente ha dato il consenso) e attende
     che sia pronto prima di inizializzare un widget. */
  function whenCalendlyReady(cb) {
    if (window.Calendly) { cb(); return; }
    let s = document.querySelector('script[src*="assets.calendly.com"]');
    if (!s) {
      s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      document.body.appendChild(s);
    }
    s.addEventListener('load', cb, { once: true });
  }

  /* Selettore di sede per la prenotazione (contatti.html): una card
     informativa (nome, indirizzo, orario) per ogni sede in
     SITE_CONFIG.sedi — non semplici etichette, cosi l'utente sceglie
     sapendo già dov'è e se è aperta. Cliccandola carica il calendario
     Calendly di QUELLA sede (calendlyUrl): la prenotazione resta
     sempre legata allo studio giusto, mai a un calendario condiviso.
     Se si arriva con ?sede=slug (es. dal pulsante "Prenota" di una
     card in sedi.html) parte già su quella sede. */
  function initBookingWidget() {
    const pickerEl = document.querySelector('.sede-picker');
    const widgetEl = document.getElementById('bookingWidget');
    const labelEl = document.getElementById('selectedSedeLabel');
    if (!pickerEl || !widgetEl) return;
    const c = SITE_CONFIG;

    const select = (sede) => {
      pickerEl.querySelectorAll('.sede-pick').forEach(b => b.classList.toggle('active', b.dataset.slug === sede.slug));
      if (labelEl) labelEl.textContent = sede.nome;
      widgetEl.innerHTML = '';

      if (!hasConsent()) {
        widgetEl.innerHTML = `
          <div class="card" style="margin:0;border:none;border-radius:0;background:var(--mint)">
            <p style="margin:0 0 12px">Il calendario di prenotazione è fornito da <strong>Calendly</strong>, un servizio esterno: per caricarlo serve il tuo consenso ai cookie di terze parti.</p>
            <button class="btn" id="consentFromWidget" type="button">Accetta e mostra il calendario</button>
          </div>`;
        document.getElementById('consentFromWidget').addEventListener('click', () => {
          localStorage.setItem(CONSENT_KEY, '1');
          loadGoogleFonts();
          select(sede);
        });
        return;
      }

      const holder = document.createElement('div');
      holder.style.cssText = 'min-width:280px;height:700px';
      widgetEl.appendChild(holder);
      const url = `${sede.calendlyUrl}?hide_gdpr_banner=1&primary_color=0a5c52`;
      whenCalendlyReady(() => window.Calendly.initInlineWidget({ url, parentElement: holder }));
    };

    pickerEl.innerHTML = c.sedi.map(s => `
      <button type="button" class="sede-pick" data-slug="${s.slug}">
        <h4>${s.nome}</h4>
        <p>${s.indirizzo}</p>
        <span class="open-status-slot" data-sede="${s.slug}"></span>
      </button>`).join('');
    pickerEl.querySelectorAll('.sede-pick').forEach(btn => {
      btn.addEventListener('click', () => select(c.sedi.find(s => s.slug === btn.dataset.slug)));
    });

    const requestedSlug = new URLSearchParams(location.search).get('sede');
    select(c.sedi.find(s => s.slug === requestedSlug) || c.sedi[0]);
  }

  /* Riempie ogni <div class="emergenze-list"></div> con i contatti di
     reperibilità da SITE_CONFIG.emergenze: stesso pattern di renderSedi,
     un solo punto da editare per aggiornare medico e numero ovunque
     compare (Contatti, Home, eventualmente Sedi). */
  function renderEmergenze() {
    const e = SITE_CONFIG.emergenze;
    if (!e || !e.contatti || !e.contatti.length) return;
    const html = `
      <span class="symptom-tag urgente" style="margin-bottom:10px;display:inline-block">Urgenze fuori orario</span>
      <p style="color:var(--ink-soft);font-size:.88rem;margin-bottom:10px">${e.nota}</p>
      ${e.contatti.map(m => `<p style="margin-bottom:4px"><strong>${m.nome}:</strong> <a href="tel:${m.telefonoHref}" style="color:var(--teal);text-decoration:underline">${m.telefono}</a></p>`).join('')}`;
    document.querySelectorAll('.emergenze-list').forEach(el => { el.innerHTML = html; });
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
    if (localStorage.getItem(CONSENT_KEY)) return; // già deciso, non richiedere di nuovo
    const bar = document.createElement('div');
    bar.className = 'cookie-banner';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Preferenze cookie');
    bar.innerHTML = `
      <p>Usiamo cookie tecnici per il funzionamento del sito. Con il tuo consenso carichiamo anche Google Fonts e il calendario di prenotazione (Calendly), entrambi servizi di terze parti. Consulta la <a href="cookie-policy.html">Cookie Policy</a>.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn-ghost btn" id="cookieReject">Rifiuta</button>
        <button class="btn" id="cookieAccept">Accetta</button>
      </div>`;
    document.body.appendChild(bar);
    const close = (value) => {
      localStorage.setItem(CONSENT_KEY, value);
      bar.remove();
      if (value === '1') {
        loadGoogleFonts();
        initBookingWidget(); // ricarica il calendario, ora che c'è il consenso
      }
    };
    document.getElementById('cookieAccept').addEventListener('click', () => close('1'));
    document.getElementById('cookieReject').addEventListener('click', () => close('0'));
  }

  /* Link "Gestisci preferenze cookie" nel footer: permette di
     cambiare scelta in qualsiasi momento senza dover cancellare i
     dati di navigazione dal browser (più corretto verso l'utente). */
  function initManageCookies() {
    document.querySelectorAll('#manageCookies').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem(CONSENT_KEY);
        document.querySelector('.cookie-banner')?.remove();
        initCookieBanner();
      });
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
    renderSedi();
    renderEmergenze();
    injectSedeSchema();
    initStickyMobileCta();
    applyConfig(); // dopo aver creato tutto l'HTML/JSON-LD, così sostituisce anche quello
    initMobileMenu();
    initFaq();
    initCookieBanner();
    initManageCookies();
    initImageFallback();
    initBookingWidget();
    initOpenStatus();
    initSectionNav();
  });
})();

# Studio Dentistico — sito statico

## Stack
HTML/CSS/JS puro, zero dipendenze a pagamento.

## Architettura header/footer
Header e footer non sono più duplicati in ogni pagina: sono generati una
sola volta da `js/main.js` e iniettati nei placeholder `<div id="site-header">`
e `<div id="site-footer">` presenti in ogni file HTML. Per modificare il
menu, il numero di telefono o i link del footer basta editare `js/main.js`,
senza toccare le 7 pagine una per una.
- `<div id="site-footer"></div>` → footer completo (multi-colonna)
- `<div id="site-footer" data-variant="simple"></div>` → footer minimale (usato nelle pagine legali)

## Funzionalità aggiunte (ispirate ai principali siti odontoiatrici internazionali)
- Menu mobile funzionante (hamburger), prima il menu spariva e basta sotto 820px.
- CTA sticky su mobile ("Chiama ora" / "Prenota online") su tutte le pagine tranne Contatti.
- Sezione recensioni/testimonianze e badge di fiducia in home (social proof).
- FAQ accordion in `servizi.html`, con markup `FAQPage` (schema.org) per la SEO.
- Dati strutturati `Dentist` (schema.org) in home per la ricerca locale.
- Cookie banner minimale collegato alla Cookie Policy, con consenso salvato in `localStorage`.
- `loading="lazy"` sulle immagini fuori dal primo schermo, `preconnect` ai font Google.
- Skip-link e stati `:focus-visible` per l'accessibilità da tastiera.

## Sviluppo locale
Apri `index.html` in VS Code con l'estensione **Live Server** (gratis) per hot-reload.

## Da fare prima del lancio
1. Cerca `[Nome]`, `[Città]`, `[—]` in tutti i file e sostituisci con i dati reali.
2. Sostituisci le immagini in `img/` (foto reali dello studio/team).
3. Personalizza `privacy-policy.html` e `cookie-policy.html` con i dati veri del titolare.
4. Attiva il form: crea un progetto su [Netlify](https://netlify.com) (free tier) — il form in `contatti.html` è già pronto per Netlify Forms. In alternativa usa [Formspree](https://formspree.io).
5. Aggiungi mappa Google: sostituisci il div `#map` in `contatti.html`/`index.html` con un iframe da Google Maps (Condividi → Incorpora mappa).

## Deploy gratuito
- Pusha la cartella su GitHub.
- Collega il repo a **Netlify** o **Vercel** (deploy automatico, HTTPS incluso).
- Compra solo il dominio (~10-15€/anno) e puntalo all'hosting free.

## SEO
- Ogni pagina ha già `<title>` e `<meta description>` — personalizzali.
- Aggiungi il sito a Google Search Console dopo il deploy.

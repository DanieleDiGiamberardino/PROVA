# Studio Dentistico — sito statico

## Stack
HTML/CSS/JS puro, zero dipendenze a pagamento.

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

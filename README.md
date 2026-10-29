# Kamastra — Bozza landing page

Bozza HTML/CSS/JavaScript vanilla ispirata alla composizione del template Juniper di Squarespace. Codice scritto per questo progetto, senza dipendenze Squarespace, librerie o build. Nessuna foto o video incluso.

## Apertura
Aprire `dist/index.html` nel browser. Nello ZIP scaricabile i tre file sono nella cartella principale: aprire `index.html`. Mantenere HTML, CSS e JS nella stessa cartella.

## File
- `index.html`: testi, sezioni, ancore e finestre menu/progetto.
- `style.css`: palette, tipografia, layout responsive, segnaposto e animazioni.
- `script.js`: navigazione mobile, header fisso, sezione attiva e dialog.

## Materiali da inserire
| Slot | Contenuto | Taglio consigliato |
|---|---|---|
| hero | Video o foto principale | 16:9, soggetto centrale per crop mobile |
| preparazione | Pasta, mani o cucina | 16:9 |
| cantina | Vini e Piretto | 4:5 |
| sala | Sala principale | verticale o quadrato |
| dettagli | Dettaglio ambiente | 4:5 |
| tavola | Mise en place | 4:5 |
| civita | Civita e Pollino | 3:2 |

Le proporzioni sono indicative: verificare il ritaglio dopo l'inserimento dei materiali.

Creare una cartella `assets` accanto a index.html. Per un segnaposto sostituire i suoi contenuti con un'immagine e aggiungere `has-media`:

```html
<div class="media-slot bottle-slot has-media" data-media-slot="cantina">
  <img src="assets/cantina.webp" alt="Descrizione reale della foto" loading="lazy" width="800" height="1000">
</div>
```

Per la hero mantenere `.hero-media` e inserirvi un'immagine, oppure il video (da dotare di controllo pausa quando inserito):

```html
<div class="hero-media" data-media-slot="hero" aria-hidden="true">
  <video muted playsinline loop preload="metadata" poster="assets/hero-poster.webp">
    <source src="assets/hero.mp4" type="video/mp4">
  </video>
</div>
```

Attivare l'autoplay solo con gestione delle preferenze `prefers-reduced-motion`, fallback immagine e controllo pausa. Rimuovere le etichette dei segnaposto quando i materiali sono definitivi.

## Personalizzazione
La palette è definita all'inizio di style.css. I font sono di sistema, senza richieste esterne. Il marchio è un segnaposto tipografico in attesa del logo originale.

## Interazioni
- Menu mobile con gestione Escape, focus e chiusura sulle ancore.
- Dialog menu e proposta con ritorno del focus all'apertura/chiusura.
- Scorrimento alle sezioni, header fisso, collegamenti telefono/email/Maps.
- Comparsa dei contenuti con IntersectionObserver e rispetto del movimento ridotto.
- Nessun modulo invia dati, nessun sistema registra prenotazioni.

## Contenuti e pubblicazione
Testi iniziali derivati dalle pagine pubbliche di Kamastra, con formulazioni editoriali dimostrative. Confermare piatti, storia e contatti prima dell'uso pubblico. Prezzi e orari non sono inventati: gli orari vanno richiesti al ristorante. Nessuna testimonianza fittizia.
La bozza contiene `noindex,nofollow` e la dicitura demo non ufficiale. La versione Sites iniziale è privata; condivisione da decidere prima dell'invio al proprietario. Prima di pubblicare la versione definitiva verificare informazioni aziendali e privacy secondo funzionalità effettivamente aggiunte.


## Aggiornamento materiali
Base: file HTML/CSS/JS modificati manualmente dal cliente.
Logo in assets/logo-kamastra.svg: tracciamento vettoriale del PNG fornito, con percorsi reali; non è il master vettoriale originale. Il PNG originale è conservato.
Video vino: H.264, senza audio, faststart, proporzioni 16:9 senza deformazione, autoplay silenzioso e loop. Icona pausa/riproduci senza scritte sovrapposte.
Galleria: sala, piatti-2 e piatti-4. Panorama di Civita conservato per intero.
L'header rimosso dal cliente non è stato ripristinato: solo logo in alto a sinistra. Corretti riferimenti JS a elementi assenti, apertura main e ancora I Vini.

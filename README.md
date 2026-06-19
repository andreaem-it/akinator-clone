# Akinator Clone

Un clone di Akinator: pensi a un personaggio (reale o di fantasia) e l'app cerca di indovinarlo facendo domande sì/no.

## Come funziona

- **Motore di indovinello** (`server/engine.js`): ogni personaggio ha un vettore di "risposte attese" (da -1 a 1) per ogni domanda. Dopo ogni risposta dell'utente viene ricalcolato il peso di ciascun personaggio in base a quanto la sua risposta attesa si avvicina alla risposta data, e la domanda successiva viene scelta come quella che meglio distingue i candidati con più peso (massima varianza pesata).
- Quando un personaggio emerge chiaramente sugli altri (o si raggiunge il numero massimo di domande), l'app fa il suo tentativo. Se sbaglia, scarta quel personaggio e continua a provare fino a 3 volte.
- Se non riesce a indovinare, ti chiede chi era e **impara** quel nuovo personaggio dalle risposte che hai dato, salvandolo in `server/data/characters.json` per le partite future.
- Dati iniziali: 40 personaggi (reali e storici, cartoni animati, supereroi, videogiochi, anime e letteratura) e 29 domande (`server/data/`).

## Come eseguirlo

```bash
npm install
npm start
```

Apri `http://localhost:3000` nel browser.

## Struttura

```
server/
  index.js        # server Express e rotte API
  engine.js        # algoritmo di indovinello
  data/
    questions.json
    characters.json
public/
  index.html
  style.css
  app.js
```

## API

- `POST /api/start` — avvia una nuova partita.
- `POST /api/answer` — invia una risposta (`yes`, `probably`, `dont_know`, `probably_not`, `no`).
- `POST /api/guess-feedback` — conferma o respinge il tentativo (`{ correct: true|false }`).
- `POST /api/teach` — insegna un nuovo personaggio quando l'app non lo indovina.
- `GET /api/info` — numero di personaggi conosciuti.

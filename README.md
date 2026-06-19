# Akinator Clone

Un clon de Akinator: piensas en un personaje (real o ficticio) y la app intenta adivinarlo haciendo preguntas de sí/no.

## Cómo funciona

- **Motor de adivinanza** (`server/engine.js`): cada personaje tiene un vector de "respuestas esperadas" (de -1 a 1) para cada pregunta. Tras cada respuesta del usuario se recalcula el peso de cada personaje según cuánto se parezca su respuesta esperada a la respuesta dada, y se elige la siguiente pregunta como la que mejor distingue a los candidatos con más peso (máxima varianza ponderada).
- Cuando un personaje destaca claramente sobre el resto (o se llega al máximo de preguntas), la app hace su adivinanza. Si falla, descarta ese personaje y sigue intentando hasta 3 veces.
- Si no logra adivinar, te pregunta quién era y **aprende** ese personaje nuevo a partir de las respuestas que diste, guardándolo en `server/data/characters.json` para futuras partidas.
- Datos iniciales: 40 personajes (reales e históricos, de dibujos animados, superhéroes, videojuegos, anime y literatura) y 29 preguntas (`server/data/`).

## Cómo ejecutarlo

```bash
npm install
npm start
```

Abre `http://localhost:3000` en el navegador.

## Estructura

```
server/
  index.js        # servidor Express y rutas API
  engine.js        # algoritmo de adivinanza
  data/
    questions.json
    characters.json
public/
  index.html
  style.css
  app.js
```

## API

- `POST /api/start` — inicia una partida nueva.
- `POST /api/answer` — envía una respuesta (`yes`, `probably`, `dont_know`, `probably_not`, `no`).
- `POST /api/guess-feedback` — confirma o rechaza la adivinanza (`{ correct: true|false }`).
- `POST /api/teach` — enseña un personaje nuevo cuando la app no lo adivina.
- `GET /api/info` — número de personajes conocidos.

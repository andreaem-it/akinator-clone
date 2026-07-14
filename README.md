# andreaem.it

Sito personale — React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion.

## Sviluppo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Struttura

```
src/
  data/profile.ts     # contenuti reali del profilo (nome, contatti, skills, ecc.)
  components/         # sezioni e componenti UI
  fonts.css           # font self-hosted (Space Grotesk, Inter)
public/
  fonts/              # file woff2 self-hosted
```

I contenuti (nome, email, link, skill, aree di focus) si modificano da `src/data/profile.ts`.

## Deploy

Configurato per Vercel come sito statico (`vercel.json`): build con `npm run build`, output in `dist/`.

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { startSession, answer, guessFeedback, teach, getCharacterCount } from './engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

function handle(fn) {
  return (req, res) => {
    try {
      res.json(fn(req));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
}

app.get(
  '/api/info',
  handle(() => ({ characterCount: getCharacterCount() }))
);

app.post(
  '/api/start',
  handle(() => startSession())
);

app.post(
  '/api/answer',
  handle((req) => answer(req.body.sessionId, req.body.answer))
);

app.post(
  '/api/guess-feedback',
  handle((req) => guessFeedback(req.body.sessionId, Boolean(req.body.correct)))
);

app.post(
  '/api/teach',
  handle((req) =>
    teach(req.body.sessionId, {
      name: req.body.name,
      emoji: req.body.emoji,
      category: req.body.category,
    })
  )
);

app.listen(PORT, () => {
  console.log(`Akinator Clone in ascolto su http://localhost:${PORT}`);
});

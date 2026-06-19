import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTIONS_PATH = path.join(__dirname, 'data', 'questions.json');
const CHARACTERS_PATH = path.join(__dirname, 'data', 'characters.json');

const ANSWER_VALUES = {
  yes: 1,
  probably: 0.5,
  dont_know: 0,
  probably_not: -0.5,
  no: -1,
};

const MIN_QUESTIONS_BEFORE_GUESS = 6;
const MIN_QUESTIONS_BETWEEN_GUESSES = 3;
const MAX_QUESTIONS_TOTAL = 25;
const MAX_GUESS_ATTEMPTS = 3;
const TOP_SHARE_THRESHOLD = 0.4;
const TOP_RATIO_THRESHOLD = 1.4;
const TOP_K_FOR_QUESTION_SCORING = 15;
const WEIGHT_EPSILON = 1e-6;

const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf-8'));
let characters = JSON.parse(fs.readFileSync(CHARACTERS_PATH, 'utf-8'));

const sessions = new Map();

function persistCharacters() {
  fs.writeFileSync(CHARACTERS_PATH, JSON.stringify(characters, null, 2) + '\n');
}

function createSession() {
  const id = randomUUID();
  const weights = {};
  for (const c of characters) weights[c.id] = 1;

  const session = {
    id,
    weights,
    askedQuestionIds: new Set(),
    questionCount: 0,
    guessAttempts: 0,
    rejectedIds: new Set(),
    questionsSinceLastGuess: 0,
    answers: [],
    pendingGuessId: null,
    finished: false,
  };
  sessions.set(id, session);
  return session;
}

function getSession(id) {
  const session = sessions.get(id);
  if (!session) throw new Error('Sesión no encontrada');
  return session;
}

function aliveCharacters(session) {
  return characters.filter(
    (c) => !session.rejectedIds.has(c.id) && session.weights[c.id] > WEIGHT_EPSILON
  );
}

function normalizeWeights(session) {
  const alive = aliveCharacters(session);
  if (alive.length === 0) return;
  const max = Math.max(...alive.map((c) => session.weights[c.id]));
  if (max <= 0) return;
  for (const c of alive) session.weights[c.id] /= max;
}

function applyAnswer(session, questionId, answer) {
  const userVal = ANSWER_VALUES[answer];
  if (userVal === undefined) throw new Error('Respuesta inválida');

  session.askedQuestionIds.add(questionId);
  session.questionCount += 1;
  session.questionsSinceLastGuess += 1;
  session.answers.push({ questionId, answer, value: userVal });

  if (userVal !== 0) {
    for (const c of characters) {
      if (session.rejectedIds.has(c.id)) continue;
      const charVal = c.a[questionId] ?? 0;
      const diff = Math.abs(userVal - charVal);
      const similarity = 1 - diff / 2;
      const factor = 0.15 + 0.85 * similarity;
      session.weights[c.id] *= factor;
    }
    normalizeWeights(session);
  }
}

function weightedVariance(values, weights) {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  if (totalWeight === 0) return 0;
  const mean = values.reduce((sum, v, i) => sum + v * weights[i], 0) / totalWeight;
  const variance =
    values.reduce((sum, v, i) => sum + weights[i] * (v - mean) ** 2, 0) / totalWeight;
  return variance;
}

function pickNextQuestion(session) {
  const alive = aliveCharacters(session)
    .map((c) => ({ c, w: session.weights[c.id] }))
    .sort((a, b) => b.w - a.w)
    .slice(0, TOP_K_FOR_QUESTION_SCORING);

  const unasked = questions.filter((q) => !session.askedQuestionIds.has(q.id));
  if (unasked.length === 0) return null;

  let best = null;
  let bestScore = -1;
  for (const q of unasked) {
    const values = alive.map((x) => x.c.a[q.id] ?? 0);
    const weights = alive.map((x) => x.w);
    const score = weightedVariance(values, weights) + Math.random() * 0.001;
    if (score > bestScore) {
      bestScore = score;
      best = q;
    }
  }
  return best;
}

function topCandidates(session, n) {
  return aliveCharacters(session)
    .map((c) => ({ c, w: session.weights[c.id] }))
    .sort((a, b) => b.w - a.w)
    .slice(0, n);
}

function shouldGuess(session) {
  const alive = aliveCharacters(session);
  if (alive.length === 0) return false;
  if (alive.length === 1) return session.questionCount >= MIN_QUESTIONS_BEFORE_GUESS - 2;
  if (session.questionCount >= MAX_QUESTIONS_TOTAL) return true;
  if (session.questionCount < MIN_QUESTIONS_BEFORE_GUESS) return false;
  if (session.questionsSinceLastGuess < MIN_QUESTIONS_BETWEEN_GUESSES && session.guessAttempts > 0) {
    return false;
  }

  const ranked = topCandidates(session, 2);
  const totalWeight = aliveCharacters(session).reduce((sum, c) => sum + session.weights[c.id], 0);
  const top1 = ranked[0]?.w ?? 0;
  const top2 = ranked[1]?.w ?? 0;
  const share = totalWeight > 0 ? top1 / totalWeight : 0;
  const ratio = top2 > 0 ? top1 / top2 : Infinity;

  const remainingUnasked = questions.length - session.askedQuestionIds.size;
  if (remainingUnasked === 0) return true;

  return share >= TOP_SHARE_THRESHOLD && ratio >= TOP_RATIO_THRESHOLD;
}

function buildGuess(session) {
  const ranked = topCandidates(session, 1);
  if (ranked.length === 0) return null;
  const character = ranked[0].c;
  session.pendingGuessId = character.id;
  session.guessAttempts += 1;
  session.questionsSinceLastGuess = 0;
  return character;
}

function progressEstimate(session) {
  const expected = MIN_QUESTIONS_BEFORE_GUESS + 6;
  return Math.min(95, Math.round((session.questionCount / expected) * 100));
}

function buildQuestionStep(session, question) {
  session._lastAskedId = question.id;
  return {
    type: 'question',
    sessionId: session.id,
    question: { id: question.id, text: question.text },
    progress: progressEstimate(session),
    questionNumber: session.questionCount + 1,
  };
}

function buildGuessStep(session, character) {
  return {
    type: 'guess',
    sessionId: session.id,
    guess: { name: character.name, emoji: character.emoji, category: character.category },
    progress: Math.min(98, progressEstimate(session) + 5),
  };
}

function buildOutOfGuessesStep(session) {
  session.finished = true;
  return {
    type: 'teach',
    sessionId: session.id,
    message: 'Me has ganado... ¡no he podido adivinarlo! ¿Quién era?',
  };
}

function nextStep(session) {
  if (shouldGuess(session)) {
    const character = buildGuess(session);
    if (!character) return buildOutOfGuessesStep(session);
    return buildGuessStep(session, character);
  }
  const question = pickNextQuestion(session);
  if (!question) {
    const character = buildGuess(session);
    if (!character) return buildOutOfGuessesStep(session);
    return buildGuessStep(session, character);
  }
  return buildQuestionStep(session, question);
}

function startSession() {
  const session = createSession();
  const question = pickNextQuestion(session);
  return buildQuestionStep(session, question);
}

function answer(sessionId, answerKey) {
  const session = getSession(sessionId);
  if (session.finished) throw new Error('La sesión ya ha terminado');
  if (session.pendingGuessId) throw new Error('Hay una adivinanza pendiente de confirmar');
  if (!(answerKey in ANSWER_VALUES)) throw new Error('Respuesta inválida');
  if (!session._lastAskedId) throw new Error('No hay pregunta activa');

  applyAnswer(session, session._lastAskedId, answerKey);
  return nextStep(session);
}

function guessFeedback(sessionId, correct) {
  const session = getSession(sessionId);
  if (!session.pendingGuessId) throw new Error('No hay ninguna adivinanza pendiente');

  const guessedId = session.pendingGuessId;
  session.pendingGuessId = null;

  if (correct) {
    session.finished = true;
    const character = characters.find((c) => c.id === guessedId);
    return {
      type: 'win',
      sessionId: session.id,
      message: `¡Sabía que era ${character.name}! ${character.emoji}`,
    };
  }

  session.rejectedIds.add(guessedId);

  if (session.guessAttempts >= MAX_GUESS_ATTEMPTS || aliveCharacters(session).length === 0) {
    return buildOutOfGuessesStep(session);
  }

  return nextStep(session);
}

function teach(sessionId, payload) {
  const session = getSession(sessionId);
  const { name, emoji, category } = payload;
  if (!name || !name.trim()) throw new Error('El nombre es obligatorio');

  const newCharacter = {
    id:
      name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '') +
      '_' +
      Date.now().toString(36),
    name: name.trim(),
    emoji: emoji && emoji.trim() ? emoji.trim() : '❓',
    category: category && category.trim() ? category.trim() : 'Otros',
    a: {},
  };

  for (const q of questions) newCharacter.a[q.id] = 0;
  for (const { questionId, value } of session.answers) {
    newCharacter.a[questionId] = value;
  }

  characters.push(newCharacter);
  persistCharacters();

  session.finished = true;
  return {
    type: 'learned',
    sessionId: session.id,
    message: `¡Gracias! He aprendido quién es ${newCharacter.name}. La próxima vez lo adivinaré.`,
  };
}

function getCharacterCount() {
  return characters.length;
}

export {
  questions,
  startSession,
  answer,
  guessFeedback,
  teach,
  getCharacterCount,
};

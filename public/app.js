const screens = {
  intro: document.getElementById('screen-intro'),
  question: document.getElementById('screen-question'),
  guess: document.getElementById('screen-guess'),
  win: document.getElementById('screen-win'),
  teach: document.getElementById('screen-teach'),
  learned: document.getElementById('screen-learned'),
};

const state = {
  sessionId: null,
};

function showScreen(name) {
  for (const key of Object.keys(screens)) {
    screens[key].classList.toggle('active', key === name);
  }
}

function showError(message) {
  const banner = document.getElementById('error-banner');
  banner.textContent = message;
  banner.hidden = false;
  setTimeout(() => {
    banner.hidden = true;
  }, 3500);
}

async function api(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Algo salió mal');
  return data;
}

function renderStep(step) {
  state.sessionId = step.sessionId;

  if (step.type === 'question') {
    document.getElementById('question-text').textContent = step.question.text;
    document.getElementById('question-number').textContent = `Pregunta ${step.questionNumber}`;
    document.getElementById('progress-fill').style.width = `${step.progress}%`;
    showScreen('question');
  } else if (step.type === 'guess') {
    document.getElementById('guess-emoji').textContent = step.guess.emoji;
    document.getElementById('guess-name').textContent = step.guess.name;
    document.getElementById('guess-category').textContent = step.guess.category || '';
    showScreen('guess');
  } else if (step.type === 'win') {
    document.getElementById('win-message').textContent = step.message;
    showScreen('win');
  } else if (step.type === 'teach') {
    document.getElementById('teach-message').textContent = step.message;
    document.getElementById('teach-form').reset();
    showScreen('teach');
  } else if (step.type === 'learned') {
    document.getElementById('learned-message').textContent = step.message;
    showScreen('learned');
  }
}

async function startGame() {
  try {
    const step = await api('/api/start');
    renderStep(step);
  } catch (err) {
    showError(err.message);
  }
}

async function sendAnswer(answer) {
  try {
    const step = await api('/api/answer', { sessionId: state.sessionId, answer });
    renderStep(step);
  } catch (err) {
    showError(err.message);
  }
}

async function sendGuessFeedback(correct) {
  try {
    const step = await api('/api/guess-feedback', { sessionId: state.sessionId, correct });
    renderStep(step);
  } catch (err) {
    showError(err.message);
  }
}

async function loadCharacterCount() {
  try {
    const res = await fetch('/api/info');
    const data = await res.json();
    document.getElementById('character-count').textContent = `Conozco ${data.characterCount} personajes... ¡y aprendo más cada partida!`;
  } catch {
    /* not critical if it fails */
  }
}

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-restart-win').addEventListener('click', startGame);
document.getElementById('btn-restart-learned').addEventListener('click', startGame);
document.getElementById('btn-skip-teach').addEventListener('click', startGame);

document.getElementById('btn-guess-yes').addEventListener('click', () => sendGuessFeedback(true));
document.getElementById('btn-guess-no').addEventListener('click', () => sendGuessFeedback(false));

document.querySelectorAll('.btn-answer').forEach((btn) => {
  btn.addEventListener('click', () => sendAnswer(btn.dataset.answer));
});

document.getElementById('teach-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('teach-name').value;
  const emoji = document.getElementById('teach-emoji').value;
  const category = document.getElementById('teach-category').value;
  try {
    const step = await api('/api/teach', { sessionId: state.sessionId, name, emoji, category });
    renderStep(step);
  } catch (err) {
    showError(err.message);
  }
});

loadCharacterCount();

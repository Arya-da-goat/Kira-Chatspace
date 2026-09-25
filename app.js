const chatWindow = document.getElementById('chat');
const composer = document.getElementById('composer');
const promptInput = document.getElementById('prompt');

const seedMessages = [
  {
    role: 'bot',
    text: 'Hello! I\'m Kira. Ask me for project ideas, technical help, writing, or strategy support.'
  }
];

function generateReply(input) {
  const text = String(input || '').trim();
  if (!text) return 'How can I help you today?';

  const lower = text.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi')) return 'Hello! I\'m Kira. What would you like to explore today?';
  if (lower.includes('plan') || lower.includes('strategy')) return 'I can help you turn that into a clear roadmap. Start with the goal, constraints, timeline, and key milestones, and I\'ll help structure it.';
  if (lower.includes('code') || lower.includes('build') || lower.includes('app')) return 'I can help design, debug, or improve a project. Share the goal, stack, and current blocker, and I\'ll guide the next steps.';
  if (lower.includes('idea') || lower.includes('brainstorm')) return 'Great idea. Let\'s clarify the problem, audience, and success metric, then I\'ll suggest a few practical directions.';
  if (lower.includes('write') || lower.includes('copy') || lower.includes('email')) return 'I can help draft polished copy. Tell me the audience, tone, and purpose, and I\'ll produce a concise version.';
  if (lower.includes('thank')) return 'You\'re very welcome. I\'m here whenever you want to think through the next step.';

  return `I\'m Kira, and I\'ve processed your message: “${text}”. I can help with ideas, planning, coding, writing, and product thinking. Tell me what you want to do next.`;
}

function appendMessage(role, text) {
  const wrapper = document.createElement('div');
  wrapper.className = `message ${role}`;

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = text;

  const meta = document.createElement('div');
  meta.className = 'message-meta';
  meta.textContent = role === 'user' ? 'You' : 'Kira';

  wrapper.appendChild(bubble);
  wrapper.appendChild(meta);
  chatWindow.appendChild(wrapper);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function renderSeed() {
  seedMessages.forEach((msg) => appendMessage(msg.role, msg.text));
}

function sendMessage(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  appendMessage('user', trimmed);
  promptInput.value = '';
  promptInput.style.height = '54px';

  const reply = generateReply(trimmed);
  setTimeout(() => appendMessage('bot', reply), 250);
}

composer.addEventListener('submit', (event) => {
  event.preventDefault();
  sendMessage(promptInput.value);
});

promptInput.addEventListener('input', () => {
  const lines = Math.max(1, Math.min(5, promptInput.value.split('\n').length));
  promptInput.rows = lines;
});

promptInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    composer.requestSubmit();
  }
});

renderSeed();

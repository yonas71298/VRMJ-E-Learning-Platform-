import { useEffect, useRef, useState } from 'react';
import './MeowAIChat.css';

const QUICK_REPLIES = [
  'How do I find a skill?',
  'How do favorites work?',
  'How do I send a match?',
  'How do I update my profile?',
];

function getBotReply(text) {
  const q = text.toLowerCase();
  if (q.includes('favorite') || q.includes('save')) {
    return 'Tap the heart on any skill card to save it. Open Saved from the top menu to see your favorites anytime.';
  }
  if (q.includes('match') || q.includes('request') || q.includes('offer')) {
    return 'Open a skill card and click Match. Write a short message, choose request or offer, then send. Track status in My Profile.';
  }
  if (q.includes('search') || q.includes('find') || q.includes('skill') || q.includes('category')) {
    return 'Use the search box or category tiles on Explore. You can also try Voice search to find skills faster.';
  }
  if (q.includes('profile') || q.includes('update')) {
    return 'Go to My Profile to update what you offer, what you want to learn, and manage your match requests.';
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return 'Hello! I am Meow AI. Ask me about search, favorites, matches, or your profile.';
  }
  return 'I can help with SkillSwap basics — search, favorites, matches, and profile. What would you like to know?';
}

function MeowAIChat({ userName = 'friend' }) {
  const firstName = userName.split(' ')[0] || 'friend';
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: `Hi ${firstName}! Ask me about search, favorites, matches, or profile anytime.`,
    },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = (raw) => {
    const text = raw.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), from: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: 'bot',
          text: getBotReply(text),
        },
      ]);
    }, 450);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="meow-ai">
      {open && (
        <div className="meow-ai__panel" role="dialog" aria-label="Meow AI chat">
          <div className="meow-ai__header">
            <div className="meow-ai__header-info">
              <img src="/img/meow-ai.png" alt="" className="meow-ai__avatar" />
              <div>
                <strong>Meow AI</strong>
                <p>VRMJ learning assistant</p>
              </div>
            </div>
            <button
              type="button"
              className="meow-ai__close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="meow-ai__messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`meow-ai__bubble meow-ai__bubble--${msg.from}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="meow-ai__quick">
            {QUICK_REPLIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => sendMessage(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <form className="meow-ai__form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Meow AI…"
              aria-label="Message Meow AI"
            />
            <button type="submit" className="meow-ai__send">
              Send
            </button>
          </form>
        </div>
      )}

      <div className="meow-ai__launch">
        {!open && (
          <div className="meow-ai__mascot" aria-hidden="true">
            <img src="/img/meow-ai.png" alt="" />
            <span className="meow-ai__hello">Hello! How can I help you?</span>
          </div>
        )}
        <button
          type="button"
          className="meow-ai__btn"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 1 1 18 0z" />
          </svg>
          Chat with AI
        </button>
      </div>
    </div>
  );
}

export default MeowAIChat;

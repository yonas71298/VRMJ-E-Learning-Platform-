import { useCallback, useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SkillCard from '../components/SkillCard';
import VoiceSearch from '../components/VoiceSearch';
import {
  CATEGORIES,
  createMatchRequest,
  fetchSkills,
  getFavorites,
  toggleFavorite,
} from '../services/api';

const CATEGORY_META = {
  All: { letter: 'A', color: '#2f6bff' },
  Technology: { letter: 'T', color: '#3b82f6' },
  Languages: { letter: 'L', color: '#8b5cf6' },
  Music: { letter: 'M', color: '#ec4899' },
  Arts: { letter: 'Ar', color: '#f59e0b' },
  Lifestyle: { letter: 'Li', color: '#10b981' },
  Business: { letter: 'B', color: '#0ea5e9' },
};

function Home({ user }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [matchMessage, setMatchMessage] = useState('');
  const [matchType, setMatchType] = useState('request');
  const [toast, setToast] = useState('');

  const firstName = user?.name?.split(' ')[0] || 'Learner';

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchSkills()
      .then((data) => {
        if (active) {
          setSkills(data);
          setError('');
        }
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (user) setFavorites(getFavorites(user.id));
  }, [user]);

  const filteredSkills = useMemo(() => {
    const term = query.trim().toLowerCase();
    return skills.filter((skill) => {
      const matchesCategory = category === 'All' || skill.category === category;
      if (!matchesCategory) return false;
      if (!term) return true;
      const haystack = [
        skill.title,
        skill.description,
        skill.user,
        skill.category,
        ...(skill.tags || []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [skills, query, category]);

  const handleToggleFavorite = (skillId) => {
    const next = toggleFavorite(user.id, skillId);
    setFavorites(next);
  };

  const handleVoiceResult = useCallback((transcript) => {
    setQuery(transcript);
  }, []);

  const openMatchModal = (skill) => {
    setSelectedSkill(skill);
    setMatchType(skill.type === 'offer' ? 'request' : 'offer');
    setMatchMessage(
      `Hi ${skill.user}, I'd love to connect on "${skill.title}".`
    );
  };

  const closeMatchModal = () => {
    setSelectedSkill(null);
    setMatchMessage('');
  };

  const submitMatch = (e) => {
    e.preventDefault();
    if (!selectedSkill || !matchMessage.trim()) return;
    createMatchRequest(user.id, selectedSkill, matchMessage.trim(), matchType);
    setToast(`Match ${matchType} sent for "${selectedSkill.title}".`);
    closeMatchModal();
    setTimeout(() => setToast(''), 2800);
  };

  return (
    <div className="page home-page">
      <section className="welcome">
        <div className="welcome__wave" aria-hidden="true" />
        <div className="welcome__copy">
          <p className="welcome__hello">Hi {firstName}, welcome back</p>
          <h1>What do you want to learn today?</h1>
          <p className="welcome__lead">
            {user.skillsWant
              ? `You want to learn ${user.skillsWant}. Explore matching skills from the community.`
              : 'Browse community skills, save favorites, and send swap matches that fit you.'}
          </p>
        </div>
        <div className="welcome__stats">
          <div className="welcome__pill">
            <span>Live skills</span>
            <strong>{skills.length || '—'}</strong>
          </div>
          <div className="welcome__pill welcome__pill--delay">
            <span>Your favorites</span>
            <strong>{favorites.length}</strong>
          </div>
        </div>
      </section>

      <div className="quick-row">
        <div className="quick-card">
          <div className="quick-card__icon" style={{ background: '#eaf0ff', color: '#2f6bff' }}>
            1
          </div>
          <div>
            <h3>You offer</h3>
            <p>{user.skillsOffer || 'Add skills on Profile'}</p>
          </div>
        </div>
        <div className="quick-card">
          <div className="quick-card__icon" style={{ background: '#e8f8f1', color: '#047857' }}>
            2
          </div>
          <div>
            <h3>You want</h3>
            <p>{user.skillsWant || 'Add learning goals'}</p>
          </div>
        </div>
        <div className="quick-card">
          <div className="quick-card__icon" style={{ background: '#fff7ed', color: '#c2410c' }}>
            3
          </div>
          <div>
            <h3>Next step</h3>
            <p>Pick a skill and send a match</p>
          </div>
        </div>
      </div>

      <section className="toolbar section">
        <div className="section__head">
          <h2>Choose a category</h2>
          <p>Pick a topic and browse skills the way you browse courses.</p>
        </div>

        <div className="category-grid" role="list">
          {CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat] || CATEGORY_META.All;
            return (
              <button
                key={cat}
                type="button"
                role="listitem"
                className={`cat-tile ${category === cat ? 'is-active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                <span
                  className="cat-tile__badge"
                  style={{ background: meta.color }}
                  aria-hidden="true"
                >
                  {meta.letter}
                </span>
                <span className="cat-tile__label">{cat === 'All' ? 'All skills' : cat}</span>
              </button>
            );
          })}
        </div>

        <div className="toolbar__controls" style={{ marginTop: '1.1rem' }}>
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
            categories={CATEGORIES}
          />
          <VoiceSearch onResult={handleVoiceResult} />
        </div>
      </section>

      <section className="section">
        <div className="results-bar">
          <h2>{category === 'All' ? 'Popular skills' : `${category} skills`}</h2>
          <p>
            {loading ? 'Loading…' : `${filteredSkills.length} result${filteredSkills.length === 1 ? '' : 's'}`}
          </p>
        </div>

        {loading && <p className="state-msg">Loading community skills…</p>}
        {error && <p className="form-error form-error--block">{error}</p>}
        {!loading && !error && filteredSkills.length === 0 && (
          <p className="state-msg">No skills match your search. Try another keyword.</p>
        )}
        <div className="skill-grid">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isFavorite={favorites.includes(skill.id)}
              onToggleFavorite={handleToggleFavorite}
              onRequestMatch={openMatchModal}
            />
          ))}
        </div>
      </section>

      {selectedSkill && (
        <div className="modal-backdrop" onClick={closeMatchModal} role="presentation">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="match-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="match-title">Send a skill match</h2>
            <p>
              Connect with <strong>{selectedSkill.user}</strong> about{' '}
              <strong>{selectedSkill.title}</strong>.
            </p>
            <form onSubmit={submitMatch} className="auth-form">
              <label>
                Match type
                <select
                  value={matchType}
                  onChange={(e) => setMatchType(e.target.value)}
                >
                  <option value="request">I want to learn this</option>
                  <option value="offer">I can teach / help with this</option>
                </select>
              </label>
              <label>
                Message
                <textarea
                  rows={4}
                  value={matchMessage}
                  onChange={(e) => setMatchMessage(e.target.value)}
                  required
                />
              </label>
              <div className="modal__actions">
                <button type="button" className="btn btn--ghost" onClick={closeMatchModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  Send match
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default Home;

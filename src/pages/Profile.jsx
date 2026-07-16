import { useEffect, useState } from 'react';
import MatchCard from '../components/MatchCard';
import {
  getMatches,
  updateMatchStatus,
  updateSessionProfile,
} from '../services/api';

function Profile({ user, onUserUpdate }) {
  const [form, setForm] = useState({
    name: user.name || '',
    bio: user.bio || '',
    skillsOffer: user.skillsOffer || '',
    skillsWant: user.skillsWant || '',
  });
  const [matches, setMatches] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMatches(getMatches(user.id));
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = updateSessionProfile({
      name: form.name.trim(),
      bio: form.bio.trim(),
      skillsOffer: form.skillsOffer.trim(),
      skillsWant: form.skillsWant.trim(),
    });
    onUserUpdate(updated);
    setSaved(true);
  };

  const handleMatchStatus = (matchId, status) => {
    setMatches(updateMatchStatus(user.id, matchId, status));
  };

  const initials = (user.name || 'U')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <div className="page profile-page">
      <section className="section">
        <div className="profile-hero">
          <div className="avatar" aria-hidden="true">
            {initials}
          </div>
          <div>
            <h1>Hey {user.name.split(' ')[0]}, this is your space</h1>
            <p>
              {user.skillsWant
                ? `Learning goal: ${user.skillsWant}`
                : 'Update what you teach and what you want to learn.'}
            </p>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSave}>
          <label>
            Display name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input type="email" value={user.email} disabled />
          </label>

          <label className="span-2">
            Bio
            <textarea
              name="bio"
              rows={3}
              value={form.bio}
              onChange={handleChange}
              placeholder="A short intro for other learners"
            />
          </label>

          <label>
            Skills I offer
            <input
              type="text"
              name="skillsOffer"
              value={form.skillsOffer}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Skills I want
            <input
              type="text"
              name="skillsWant"
              value={form.skillsWant}
              onChange={handleChange}
              required
            />
          </label>

          <div className="profile-form__actions span-2">
            <button type="submit" className="btn btn--primary">
              Save profile
            </button>
            {saved && <span className="form-success">Profile updated.</span>}
          </div>
        </form>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Your match requests</h2>
          <p>Track offers and requests you have sent from the home feed.</p>
        </div>
        {matches.length === 0 ? (
          <p className="state-msg">No matches yet. Browse skills and send a request.</p>
        ) : (
          <div className="match-list">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onUpdateStatus={handleMatchStatus}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;

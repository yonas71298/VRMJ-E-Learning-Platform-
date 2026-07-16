import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SkillCard from '../components/SkillCard';
import { fetchSkills, getFavorites, toggleFavorite } from '../services/api';

function Favorites({ user }) {
  const [skills, setSkills] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setFavorites(getFavorites(user.id));
    fetchSkills()
      .then((data) => {
        if (active) setSkills(data);
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
  }, [user.id]);

  const favoriteSkills = skills.filter((skill) => favorites.includes(skill.id));

  const handleToggleFavorite = (skillId) => {
    const next = toggleFavorite(user.id, skillId);
    setFavorites(next);
  };

  return (
    <div className="page favorites-page">
      <section className="section">
        <div className="section__head">
          <h1>Your saved skills</h1>
          <p>
            Hi {user.name.split(' ')[0]} — keep the skills you love here and revisit anytime.
          </p>
        </div>

        {loading && <p className="state-msg">Loading favorites…</p>}
        {error && <p className="form-error form-error--block">{error}</p>}

        {!loading && !error && favoriteSkills.length === 0 && (
          <div className="empty-state">
            <p>No saved skills yet.</p>
            <Link to="/" className="btn btn--primary">
              Browse skills
            </Link>
          </div>
        )}

        <div className="skill-grid">
          {favoriteSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isFavorite
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Favorites;

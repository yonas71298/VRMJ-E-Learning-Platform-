function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

const CATEGORY_COLORS = {
  Technology: '#3b82f6',
  Languages: '#8b5cf6',
  Music: '#ec4899',
  Arts: '#f59e0b',
  Lifestyle: '#10b981',
  Business: '#0ea5e9',
};

function SkillCard({ skill, isFavorite, onToggleFavorite, onRequestMatch }) {
  const banner = CATEGORY_COLORS[skill.category] || '#2f6bff';

  return (
    <article className="skill-card">
      <div className="skill-card__banner" style={{ background: banner }}>
        <span className="skill-card__type">
          {skill.type === 'offer' ? 'Offering' : 'Requesting'}
        </span>
        <button
          type="button"
          className={`btn btn--icon skill-card__fav ${isFavorite ? 'is-active' : ''}`}
          onClick={() => onToggleFavorite(skill.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove favorite' : 'Save favorite'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className="skill-card__body">
        <span className="skill-card__category">{skill.category}</span>
        <h3 className="skill-card__title">{skill.title}</h3>
        <p className="skill-card__desc">{skill.description}</p>

        {skill.tags?.length > 0 && (
          <div className="skill-card__tags">
            {skill.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="skill-card__tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="skill-card__footer">
          <div className="skill-card__person">
            <div className="avatar" style={{ background: banner }}>
              {getInitials(skill.user)}
            </div>
            <div>
              <p className="skill-card__user">{skill.user}</p>
              <p className="skill-card__sub">
                {skill.level} · {skill.location}
              </p>
            </div>
          </div>
          {onRequestMatch && (
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => onRequestMatch(skill)}
            >
              Match
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default SkillCard;

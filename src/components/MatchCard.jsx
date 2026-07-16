function MatchCard({ match, onUpdateStatus }) {
  return (
    <article className="match-card">
      <div className="match-card__top">
        <div>
          <h3>{match.skillTitle}</h3>
          <p className="match-card__meta">
            with {match.skillOwner} · {match.category} ·{' '}
            <span className="match-card__type">{match.matchType}</span>
          </p>
        </div>
        <span className={`status status--${match.status}`}>{match.status}</span>
      </div>

      {match.message && <p className="match-card__message">“{match.message}”</p>}

      {match.status === 'pending' && (
        <div className="match-card__actions">
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={() => onUpdateStatus(match.id, 'accepted')}
          >
            Mark accepted
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => onUpdateStatus(match.id, 'declined')}
          >
            Decline
          </button>
        </div>
      )}
    </article>
  );
}

export default MatchCard;

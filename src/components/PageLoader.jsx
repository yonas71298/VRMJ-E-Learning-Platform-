import './PageLoader.css';

function PageLoader({ message = 'Loading…' }) {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-busy="true">
      <div className="page-loader__glow" aria-hidden="true" />

      <div className="page-loader__inner">
        <div className="page-loader__logo-wrap">
          <img
            src="/img/logo.png"
            alt="VRMJ E Learning"
            className="page-loader__logo"
          />
        </div>

        <p className="page-loader__brand">VRMJ</p>
        <p className="page-loader__tag">E - Learning</p>

        <div className="page-loader__spinner" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="page-loader__bar" aria-hidden="true">
          <span className="page-loader__bar-fill" />
        </div>

        <p className="page-loader__text">{message}</p>
      </div>
    </div>
  );
}

export default PageLoader;

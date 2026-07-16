import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <p className="app-footer__copy">
          © VRMJ E - Learning · Meow AI 2025
        </p>
        <a
          href="https://vrmj.in"
          target="_blank"
          rel="noopener noreferrer"
          className="app-footer__link"
        >
          vrmj.in
        </a>
      </div>
    </footer>
  );
}

export default Footer;

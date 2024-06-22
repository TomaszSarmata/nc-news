import "./footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section company-info">
          <h1 className="footer-logo">NC News</h1>
          <p>&copy; 2024 NC News. All rights reserved.</p>
        </div>
        <div className="footer-section nav-links">
          <h2>Navigation</h2>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/articles">Articles</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section social-media">
          <h2>Follow Us</h2>
          <ul className="social-media-icons">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/facebook.png" alt="Facebook" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/twitter.png" alt="Twitter" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/instagram.png" alt="Instagram" />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact-info">
          <h2>Contact Us</h2>
          <p>Email: info@ncnews.com</p>
          <p>Phone: 01612584455</p>
        </div>
      </div>
    </footer>
  );
}

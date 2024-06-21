import "./header.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <section className="header-wrapper">
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-list-item grow">
          <Link to="/articles-by-topic/:topic" className="nav-link">
            Articles
          </Link>
        </li>

        <li className="nav-list-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <img src="/loggedOut.png" alt="" />
      </ul>
    </section>
  );
}

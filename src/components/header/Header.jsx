import { Link } from "react-router-dom";

export function Header() {
  return (
    <section className="header-wrapper">
      <ul>
        <li>
          <Link to="/articles-by-topic/:topic">Search Articles</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link>Login</Link>
        </li>
      </ul>
    </section>
  );
}

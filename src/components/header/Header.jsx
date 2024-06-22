import "./header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";

export function Header() {
  const { user, setUser } = useContext(UserContext);

  const handleLogin = () => {
    if (!user) return;
    setUser("");
  };
  return (
    <section className="header-wrapper">
      <div className="nav-container">
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/articles-by-topic/:topic" className="nav-link">
              Articles
            </Link>
          </li>

          <li className="nav-list-item" onClick={handleLogin}>
            <Link to="/login" className="nav-link">
              {user ? "Logout" : "Login"}
            </Link>
          </li>
          <li className="nav-list-item">
            <img
              src={user ? `/${user}.png` : `/loggedOut.png`}
              alt=""
              className="user-icon"
            />
          </li>
        </ul>
      </div>
      <div className="header-h1-container">
        <h1>NC News</h1>
        {/* <img src="/banner.png" alt="Banner" /> */}
      </div>
    </section>
  );
}

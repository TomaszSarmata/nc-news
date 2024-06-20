import "./notFound.css";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}

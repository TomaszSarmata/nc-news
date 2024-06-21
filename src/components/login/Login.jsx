import "./login.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";

export function Login() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    const currentUser = e.currentTarget.dataset.user;
    setUser(currentUser);
    navigate("/");
  };

  return (
    <section className="login-wrapper">
      <h1 className="login-header">Please Select User</h1>
      <ul className="login-user-list">
        <li
          className="login-user-list-item"
          data-user="grumpy19"
          onClick={handleUserChange}
        >
          <img src="/grumpy19.png" alt="grumpy19" />
          <span className="user-name">grumpy19</span>
        </li>
        <li
          className="login-user-list-item"
          data-user="happyamy2016"
          onClick={handleUserChange}
        >
          <img src="/happyamy2016.png" alt="happyamy" />
          <span className="user-name">happyamy2016</span>
        </li>
        <li
          className="login-user-list-item"
          data-user="jessjelly"
          onClick={handleUserChange}
        >
          <img src="/jessjelly.png" alt="jessjelly" />
          <span className="user-name"> jessjelly</span>
        </li>
        <li
          className="login-user-list-item"
          data-user="tickle122"
          onClick={handleUserChange}
        >
          <img src="/tickle122.png" alt="tickle122" />
          <span className="user-name">tickle122</span>
        </li>
        <li
          className="login-user-list-item"
          data-user="weegembump"
          onClick={handleUserChange}
        >
          <img src="/weegembump.png" alt="weegembump" />
          <span className="user-name">weegembump</span>
        </li>
      </ul>
    </section>
  );
}

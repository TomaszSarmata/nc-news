import "./home.css";
import { ArticleList } from "../article-list/ArticleList";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";

export function Home() {
  const { user } = useContext(UserContext);
  return (
    <main className="main">
      <h3>
        Welcome{" "}
        {user
          ? `Back ${user}!`
          : "Stranger. To post your comments you will first have to login"}
      </h3>
      <ArticleList />
    </main>
  );
}

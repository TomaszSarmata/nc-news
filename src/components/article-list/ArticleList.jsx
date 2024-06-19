import "./articleList.css";
import { ArticleCard } from "../article-card/ArticleCard";
import { ncNewsApi } from "../../utils/api";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../utils/api";

export function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getAllArticles()
      .then((articles) => {
        setErrorMessage("");
        setSuccessMessage("");
        setArticles(articles);
        setSuccessMessage("Here are your articles");
        setTimeout(() => {
          setSuccessMessage("");
        }, 1000);
      })
      .catch((err) => {
        setErrorMessage("There was a problem displaying the articles");
        console.log("error:", err);
      });
  }, []);

  return (
    <div className="article-list-wrapper">
      <p className={errorMessage ? "error" : ""}>{errorMessage}</p>
      <p className={successMessage ? "success" : ""}>{successMessage}</p>
      <ul className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
    </div>
  );
}

import "./articleList.css";
import { ArticleCard } from "../article-card/ArticleCard";
import { ncNewsApi } from "../../utils/api";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../utils/api";
import { Loader } from "../loader/Loader";

export function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllArticles()
      .then((articles) => {
        setErrorMessage("");
        setSuccessMessage("");
        setArticles(articles);
        setSuccessMessage("Here are your articles");
        setTimeout(() => {
          setSuccessMessage("");
        }, 1000);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage("There was a problem displaying the articles");
        console.log("error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

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

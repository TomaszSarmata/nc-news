import "./articleList.css";
import { ArticleCard } from "../article-card/ArticleCard";
import { ncNewsApi } from "../../utils/api";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../utils/api";
import { Loader } from "../loader/Loader";
import { useSearchParams } from "react-router-dom";

export function ArticleList({ topic }) {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "data";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setLoading(true);
    getAllArticles(topic)
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
  }, [topic]);

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSearchParams({ sort_by: newSortBy, order: order });
  };
  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setSearchParams({ sortBy: sortBy, order: newOrder });
  };

  if (loading) return <Loader />;

  return (
    <div className="article-list-wrapper">
      <label>
        Sort by:
        <select value={sortBy} onChange={handleSortChange}>
          <option value="date">Date</option>
          <option value="comment">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
      </label>
      <label>
        Order:
        <select value={order} onChange={handleOrderChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
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

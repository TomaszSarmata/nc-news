import "./articleList.css";
import { ArticleCard } from "../article-card/ArticleCard";
import { ncNewsApi } from "../../utils/api";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../utils/api";
import { Loader } from "../loader/Loader";

export function ArticleList({ topic }) {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("date");

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
        if (err.response.status === 404) {
          setErrorMessage(
            "There was a problem displaying the articles due to the incorrect url provided in the api call. Check /utils/api.js"
          );
          console.log("error:", err);
          setLoading(false);
        } else {
          setErrorMessage("There was a problem displaying the articles");
          console.log("error:", err);
          setLoading(false);
        }
      });
  }, [topic]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortBy === "date") {
      if (order === "asc") {
        return new Date(a.created_at) - new Date(b.created_at);
      } else {
        return new Date(b.created_at) - new Date(a.created_at);
      }
    } else if (sortBy === "comment") {
      if (order === "asc") {
        return a.comment_count - b.comment_count;
      } else {
        return b.comment_count - a.comment_count;
      }
    } else if (sortBy === "votes") {
      if (order === "asc") {
        return a.votes - b.votes;
      } else {
        return b.votes - a.votes;
      }
    }
    return 0;
  });

  if (loading) return <Loader />;

  return (
    <div className="article-list-wrapper">
      <div className="controllers-wrapper">
        <label>
          Sort by:
          <select onChange={handleSortChange}>
            <option value="date">Date</option>
            <option value="comment">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <label>
          Order:
          <select onChange={handleOrderChange}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>
      <p className={errorMessage ? "error" : ""}>{errorMessage}</p>
      <p className={successMessage ? "success" : ""}>{successMessage}</p>
      <ul className="article-list">
        {sortedArticles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
    </div>
  );
}

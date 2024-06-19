import "./articleCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ArticleCard({ article }) {
  const [articleID, setArticleID] = useState(null);
  const navigate = useNavigate();

  const handleArticleID = (id) => {
    navigate(`articles/${id}`);
  };

  return (
    <li
      className="article-card"
      onClick={() => {
        handleArticleID(article.article_id);
      }}
    >
      <div className="article-card-container">
        <div className="article-card-img-container">
          <img src={article.article_img_url} alt="" />
        </div>
        <div className="article-card-text-container">
          <h3 className="article-card-title">{article.title}</h3>
          <p className="article-card-author">Author: {article.author}</p>
          <p className="article-card-comments">{article.comment_count}</p>
          <p>{article.topic}</p>
        </div>

        <button className="article-card-button">Vote</button>
      </div>
    </li>
  );
}

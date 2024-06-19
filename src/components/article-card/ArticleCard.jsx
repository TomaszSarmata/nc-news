import "./articleCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { truncateTitle } from "../../utils/helper";

export function ArticleCard({ article }) {
  const [articleID, setArticleID] = useState(null);
  const navigate = useNavigate();

  const handleArticleID = (id) => {
    navigate(`/articles/${id}`);
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
          <h3 className="article-card-title">
            {truncateTitle(article.title, 25)}
          </h3>
          <p className="article-card-topic">Topic: {article.topic}</p>
          <p className="article-card-author">Posted by: {article.author}</p>
          <button className="article-card-cta-btn">Read more</button>
        </div>
      </div>
    </li>
  );
}

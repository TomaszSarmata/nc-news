import "./articleCard.css";

export function ArticleCard({ article }) {
  console.log(article);
  return (
    <li className="article-card">
      <div className="article-card-container">
        <div className="article-card-img-container">
          <img src={article.article_img_url} alt="" />
        </div>
        <div className="article-card-text-container">
          <h3 className="article-card-title">{article.title}</h3>
          <p className="article-card-author">Author: {article.author}</p>
          <p className="article-card-comments">{article.comment_count}</p>
        </div>

        <button className="article-card-button">Vote</button>
      </div>
    </li>
  );
}

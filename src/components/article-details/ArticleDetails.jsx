import { ncNewsApi } from "../../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function ArticleDetails() {
  const [article, setArticle] = useState(null);
  const { articleId } = useParams();

  useEffect(() => {
    ncNewsApi
      .get(`/articles/${articleId}`)
      .then(({ data }) => setArticle(data.article));
  }, []);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
    };

    return date.toLocaleString("en-GB", options);
  };

  if (!article) {
    return <div>loading...</div>;
  }

  const articleDate = formatDate(article.created_at);

  return (
    <article className="article-container">
      <div className="article-image-container">
        <img src={article.article_img_url} alt="" />
      </div>
      <div className="article-text-container">
        <h3 className="article-title">Author: {article.title}</h3>
        <p className="article-topic">Topic: {article.topic}</p>
        <p className="article-author">Author: {article.author}</p>
        <p className="article-date">Date: {articleDate}</p>
      </div>
    </article>
  );
}

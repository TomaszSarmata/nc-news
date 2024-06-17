import "./articleList.css";
import { ArticleCard } from "../article-card/ArticleCard";
import { ncNewsApi } from "../../utils/api";
import { useEffect, useState } from "react";

export function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    ncNewsApi.get("/articles").then(({ data }) => setArticles(data.articles));
  }, []);
  return (
    <ul className="article-list">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </ul>
  );
}

import "./articleList.css";
import { ArticleCard } from "../article-card/ArticleCard";
import { ncNewsApi } from "../../utils/api";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../utils/api";

export function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

  return (
    <ul className="article-list">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </ul>
  );
}

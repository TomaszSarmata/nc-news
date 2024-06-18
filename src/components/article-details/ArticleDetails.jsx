import "./articleDetails.css";
import { postUpVote, postDownVote } from "../../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../utils/api";
import { formatDate } from "../../utils/helper";
import { CommentList } from "../comment-list/CommentList";

export function ArticleDetails() {
  const [article, setArticle] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [votes, setVotes] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { articleId } = useParams();

  useEffect(() => {
    getArticleById(articleId).then(({ article }) => {
      setArticle(article);
      setVotes(article.votes);
    });
  }, []);

  const handleUpVote = () => {
    if (hasVoted) return;
    setErrorMessage("");
    setSuccessMessage("");

    setVotes((currentVotes) => currentVotes + 1);
    postUpVote(articleId, { inc_votes: 1 })
      .then(() => {
        setSuccessMessage("votes have been updated");
        setHasVoted(true);
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      })
      .catch((err) => {
        console.log("error:", err);
        setVotes(votes);
        setErrorMessage(err.message);
        setHasVoted(false);
      });
  };

  const handleDownVote = () => {
    if (hasVoted) return;
    setSuccessMessage("");
    setErrorMessage("");

    setVotes((currentVotes) => currentVotes - 1);
    postDownVote(articleId, { inc_votes: -1 })
      .then(() => {
        setSuccessMessage("votes have been updated");
        setHasVoted(true);
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      })
      .catch((err) => {
        console.log("error:", err);
        setVotes(votes);
        setErrorMessage(err.message);
        setHasVoted(false);
      });
  };

  if (!article) {
    return <div>loading...</div>;
  }

  const articleDate = formatDate(article.created_at);

  return (
    <article>
      <div className="article-container">
        <div className="article-image-container">
          <img src={article.article_img_url} alt="" />
        </div>
        <div className="article-text-container">
          <h3 className="article-title">Author: {article.title}</h3>
          <p className="article-topic">Topic: {article.topic}</p>
          <p className="article-body">{article.body}</p>
          <p className="article-author">Author: {article.author}</p>
          <p className="article-date">Date: {articleDate}</p>
          <p className="article-votes">Number of votes: {votes}</p>
          <p className={errorMessage ? "error" : ""}>{errorMessage}</p>
          <p className={successMessage ? "success" : ""}>{successMessage}</p>

          <div className="article-button-container">
            <button onClick={handleUpVote}>Up Vote (+1)</button>
            <button onClick={handleDownVote}>Down Vote (-1)</button>
          </div>
        </div>
      </div>

      <CommentList articleId={articleId} />
    </article>
  );
}

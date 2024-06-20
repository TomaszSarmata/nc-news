import "./articleDetails.css";
import { postUpVote, postDownVote } from "../../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../utils/api";
import { formatDate } from "../../utils/helper";
import { CommentList } from "../comment-list/CommentList";
import { Loader } from "../loader/Loader";

export function ArticleDetails({ user }) {
  const [article, setArticle] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [votes, setVotes] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { articleId } = useParams();

  useEffect(() => {
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    getArticleById(articleId)
      .then(({ article }) => {
        setArticle(article);
        setVotes(article.votes);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("error:", err);
          setErrorMessage(
            "The article you have requested does not exist. Plase make sure you provide the valid article id"
          );
          console.log(errorMessage, "here error message");
          setLoading(false);
        } else {
          console.log("error:", err);
          setErrorMessage("There was a problem fetching article details");
          setLoading(false);
        }
      });
  }, [articleId]);

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
        }, 3000);
      })
      .catch((err) => {
        console.log("error:", err);
        setVotes(votes);
        setErrorMessage("There was a problem updating your vote");
        setHasVoted(false);
      });
  };

  if (errorMessage) {
    return <p className={errorMessage ? "error" : ""}>{errorMessage}</p>;
  }

  if (!article) {
    return <Loader />;
  }

  const articleDate = formatDate(article.created_at);

  return (
    <article className="article-details">
      <div className="article-container">
        <div className="article-image-container">
          <img src={article.article_img_url} alt={article.title} />
        </div>
        <div className="article-text-container">
          <h3 className="article-title">{article.title}</h3>
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

      <CommentList articleId={articleId} user={user} />
    </article>
  );
}

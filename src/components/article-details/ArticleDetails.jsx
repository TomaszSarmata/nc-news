import "./articleDetails.css";
import { ncNewsApi } from "../../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../utils/api";
import { getComments } from "../../utils/api";
import { formatDate } from "../../utils/helper";
import { submitComment } from "../../utils/api";

export function ArticleDetails() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [votes, setVotes] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { articleId } = useParams();

  useEffect(() => {
    getArticleById(articleId).then(({ article }) => {
      setArticle(article);
      setVotes(article.votes);
    });
  }, []);

  useEffect(() => {
    getComments(articleId).then(({ comments }) => {
      setComments(comments);
    });
  }, []);

  const handleUpVote = () => {
    if (hasVoted) return;
    setErrorMessage("");
    setSuccessMessage("");

    setVotes((currentVotes) => currentVotes + 1);
    ncNewsApi
      .patch(`/articles/${articleId}`, { inc_votes: 1 })
      .then(({ data }) => {
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
    ncNewsApi
      .patch(`/articles/${articleId}`, { inc_votes: -1 })
      .then(({ data }) => {
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

  const handleUserComment = (e) => {
    setUserComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    submitComment(articleId, {
      username: "grumpy19",
      body: userComment,
      article_id: articleId,
    })
      .then(({ comment }) => {
        setComments((currentComments) => {
          return [comment, ...currentComments];
        });
        setLoading(false);
        setUserComment("");
      })

      .catch((err) => console.log("error:", err));
  };

  if (!article) {
    return <div>loading...</div>;
  }

  if (!comments) {
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

      <div className="add-comment-container">
        <h2>Add your comment</h2>
        {loading ? <div>loading...</div> : null}
        <form onSubmit={handleCommentSubmit}>
          <label htmlFor="user-comment">Your Comment:</label>
          <textarea
            type="text"
            id="user-comment"
            onChange={handleUserComment}
            value={userComment}
          />
          <button>Submit</button>
        </form>
      </div>
      <ul className="article-comments-container">
        <h2>Comments:</h2>
        {comments.map((comment) => (
          <li className="comment-card" key={comment.comment_id}>
            <p className="comment-text">{comment.body}</p>
            <p className="comment-author">{comment.author}</p>
            <p className="comment-data">{formatDate(comment.created_at)}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

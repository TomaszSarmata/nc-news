import "./commentList.css";
import { useEffect, useState } from "react";
import { getComments } from "../../utils/api";
import { formatDate } from "../../utils/helper";
import { submitComment } from "../../utils/api";
import { CommentForm } from "../comment-form/CommentForm";

export function CommentList({ articleId }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(articleId).then(({ comments }) => {
      setComments(comments);
    });
  }, []);

  const handleUserComment = (e) => {
    setUserComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    setErrorMessage("");
    e.preventDefault();
    setLoading(true);
    submitComment(articleId, {
      username: "grumpy1",
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

      .catch((err) => {
        console.log("error:", err);
        setErrorMessage("Something has gone wrong. Please try again");
        setLoading(false);
      });
  };

  if (!comments) {
    return <div>loading...</div>;
  }

  return (
    <div className="comments-container">
      <CommentForm articleId={articleId} setComments={setComments} />
      {/* <div className="add-comment-container">
        <h2>Add your comment</h2>
        <p className={errorMessage ? "error" : ""}>{errorMessage}</p>
        {loading ? <div>loading...</div> : null}
        <form onSubmit={handleCommentSubmit}>
          <label htmlFor="user-comment">Your Comment:</label>
          <textarea
            type="text"
            id="user-comment"
            onChange={handleUserComment}
            value={userComment}
            disabled={loading}
          />
          <button disabled={loading}>Submit</button>
        </form>
      </div> */}
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
    </div>
  );
}

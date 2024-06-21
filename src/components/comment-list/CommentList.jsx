import "./commentList.css";
import { useEffect, useState } from "react";
import { getComments } from "../../utils/api";
import { formatDate } from "../../utils/helper";
import { CommentForm } from "../comment-form/CommentForm";
import { Loader } from "../loader/Loader";
import { deleteComment } from "../../utils/api";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";

export function CommentList({ articleId }) {
  const { user, setUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    getComments(articleId)
      .then(({ comments }) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error:", err);
        setErrorMessage("there was a problem fetching the comments");
        setLoading(false);
      });
  }, []);

  const handleDeleteCross = (commentId) => {
    setDeleteCommentId(commentId);
  };

  const handleConfirmDelete = (commentId) => {
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    //optimistic UI update
    const updatedComments = comments.filter(
      (comment) => comment.comment_id !== commentId
    );
    setComments(updatedComments);

    deleteComment(commentId)
      .then(() => {
        setSuccessMessage("comment deleted");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        setLoading(false);
        setDeleteCommentId(null);
      })
      .catch((err) => {
        console.log("error:", err);
        setErrorMessage("There was a problem deleting your comment");
        setComments(comments);
        setLoading(false);
      });
  };

  const handleCancelDelete = (commentId) => {
    setDeleteCommentId(null);
  };

  if (!comments) {
    return <Loader />;
  }

  return (
    <div className="comments-container">
      <CommentForm articleId={articleId} setComments={setComments} />

      <ul className="article-comments-container">
        <h2>Comments:</h2>
        <p className={errorMessage ? "error" : ""}>{errorMessage}</p>
        <p className={successMessage ? "success" : ""}>{successMessage}</p>
        {comments.length === 0 ? (
          <p>
            There are currently no comments. Be the first to leave a comment
          </p>
        ) : (
          comments.map((comment) => (
            <li className="comment-card" key={comment.comment_id}>
              <p className="comment-text">{comment.body}</p>
              <p className="comment-author">{comment.author}</p>
              <p className="comment-data">{formatDate(comment.created_at)}</p>
              {comment.author === user ? (
                <div
                  className="delete-cross"
                  onClick={() => handleDeleteCross(comment.comment_id)}
                >
                  X
                </div>
              ) : null}
              {deleteCommentId === comment.comment_id ? (
                <div className="confirmation-modal">
                  Do you want to delete your comment?
                  <button
                    onClick={() => handleConfirmDelete(comment.comment_id)}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleCancelDelete(comment.comment_id)}
                  >
                    No
                  </button>
                </div>
              ) : null}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

import "./commentForm.css";
import { submitComment } from "../../utils/api";
import { useState } from "react";
import { Loader } from "../loader/Loader";

export function CommentForm({ articleId, setComments }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userComment, setUserComment] = useState("");

  const handleUserComment = (e) => {
    setUserComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    if (!userComment) {
      e.preventDefault();
      setErrorMessage("Please include your comment");
      return;
    }
    setErrorMessage("");
    setSuccessMessage("");
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

        setUserComment("");
        setSuccessMessage("Success");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        setLoading(false);
      })

      .catch((err) => {
        console.log("error:", err);
        setLoading(false);
        setErrorMessage("Something has gone wrong. Please try again");
      });
  };

  return (
    <div className="add-comment-container">
      <h2>Add your comment</h2>
      <p className={errorMessage ? "error" : ""}>{errorMessage}</p>
      <p className={successMessage ? "success" : ""}>{successMessage}</p>
      {loading ? <Loader /> : null}
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
    </div>
  );
}

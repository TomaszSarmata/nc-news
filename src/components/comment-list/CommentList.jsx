import "./commentList.css";
import { useEffect, useState } from "react";
import { getComments } from "../../utils/api";
import { formatDate } from "../../utils/helper";
import { CommentForm } from "../comment-form/CommentForm";
import { Loader } from "../loader/Loader";

export function CommentList({ articleId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(articleId).then(({ comments }) => {
      setComments(comments);
    });
  }, []);

  if (!comments) {
    return <Loader />;
  }

  return (
    <div className="comments-container">
      <CommentForm articleId={articleId} setComments={setComments} />

      <ul className="article-comments-container">
        <h2>Comments:</h2>
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
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

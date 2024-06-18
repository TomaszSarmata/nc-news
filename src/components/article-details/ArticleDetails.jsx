import "./articleDetails.css";
import { ncNewsApi } from "../../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function ArticleDetails() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [votes, setVotes] = useState(null);
  const { articleId } = useParams();

  useEffect(() => {
    ncNewsApi.get(`/articles/${articleId}`).then(({ data }) => {
      setArticle(data.article);
      setVotes(data.article.votes);
    });
  }, [article]);

  useEffect(() => {
    ncNewsApi
      .get(`/articles/${articleId}/comments`)
      .then(({ data }) => setComments(data.comments));
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

  const handleUpVote = () => {
    setVotes(votes + 1);
    ncNewsApi
      .patch(`/articles/${articleId}`, { inc_votes: 1 })
      .then(({ data }) => {
        console.log(data.article.votes, "here res from patching");
        setVotes(data.article.votes);
      })
      .catch((err) => {
        console.log("error:", err);
        setVotes(votes);
      });
  };

  const handleDownVote = () => {
    setVotes(votes - 1);
    ncNewsApi
      .patch(`/articles/${articleId}`, { inc_votes: -1 })
      .then(({ data }) => {
        setVotes(data.article.votes);
      })
      .catch((err) => {
        console.log("error:", err);
        setVotes(votes);
      });
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
          <p className="article-votes">Number of votes: {article.votes}</p>
          <div className="article-button-container">
            <button onClick={handleUpVote}>Up Vote (+1)</button>
            <button onClick={handleDownVote}>Down Vote (-1)</button>
          </div>
        </div>
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

import { useState, useEffect } from "react";
import { getAllTopics } from "../../utils/api";
import { Loader } from "../loader/Loader";
import { ArticleList } from "../article-list/ArticleList";

export function Search() {
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    getAllTopics()
      .then((topics) => {
        setTopics(topics);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error:", err);
        setErrorMessage("There was a problem getting all topics for articles");
        setLoading(false);
      });
  }, []);

  const handleTopic = (e) => {
    setTopic(e.target.value);
  };

  if (loading) return <Loader />;

  return (
    <section className="search-wrapper">
      <label htmlFor="categories">Filter by topic: </label>
      <select name="" id="categories" onChange={handleTopic}>
        <option value="">---</option>
        {topics.map((topic) => {
          return (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          );
        })}
      </select>
      <ArticleList topic={topic}></ArticleList>
    </section>
  );
}

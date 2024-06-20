import axios from "axios";

export const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-x90f.onrender.com/api",
});

export const getAllArticles = (topic, sortBy, order) => {
  return ncNewsApi
    .get(`/articles`, {
      params: {
        topic: topic,
        sort_by: sortBy,
        order: order,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticleById = (id) => {
  return ncNewsApi.get(`/articles/${id}`).then(({ data }) => data);
};

// handle voting on ArticleDetails page
export const postUpVote = (id, body) => {
  return ncNewsApi.patch(`/articles/${id}`, body).then(({ data }) => data);
};
export const postDownVote = (id, body) => {
  return ncNewsApi.patch(`/articles/${id}`, body).then(({ data }) => data);
};

// handle comments
export const getComments = (id) => {
  return ncNewsApi.get(`/articles/${id}/comments`).then(({ data }) => data);
};

export const submitComment = (id, body) => {
  return ncNewsApi
    .post(`/articles/${id}/comments`, body)
    .then(({ data }) => data);
};

export const deleteComment = (id) => {
  return ncNewsApi.delete(`/comments/${id}`);
};

export const getAllTopics = () => {
  return ncNewsApi
    .get(`/topics`)
    .then(({ data }) => data.topics, "here topics");
};

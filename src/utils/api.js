import axios from "axios";

export const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-x90f.onrender.com/api",
});

export const getArticleById = (id) => {
  return ncNewsApi.get(`/articles/${id}`).then(({ data }) => data);
};

export const getComments = (id) => {
  return ncNewsApi.get(`/articles/${id}/comments`).then(({ data }) => data);
};

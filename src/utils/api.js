import axios from "axios";

export const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-x90f.onrender.com/api",
});

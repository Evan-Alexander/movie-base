import * as articles from "./index";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getArticles = (sort) => {
  return async (dispatch, getState) => {
    try {
      const articles = await axios.post(`/api/articles/loadmore`, sort);
      console.log(articles.data);
    } catch (error) {}
  };
};

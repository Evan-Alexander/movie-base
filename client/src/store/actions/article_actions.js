import * as articles from "./index";
import axios from "axios";
import { getAuthHeader } from "../../utils/tools";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getArticles = (sort) => {
  return async (dispatch, getState) => {
    try {
      const arts = await axios.post(`/api/articles/loadmore`, sort);
      const prevArts = getState().articles.articles;
      let newArts = [...arts.data];

      if (prevArts) {
        newArts = [...prevArts, ...arts.data];
      }
      dispatch(articles.getArticles(newArts));
    } catch (error) {
      dispatch(articles.errorGlobal("There was an error loading articles"));
    }
  };
};

export const getArticle = (id) => {
  return async (dispatch) => {
    try {
      const request = await axios.get(`/api/articles/get_byid/${id}`);
      console.log(request.data);
      dispatch(articles.getArticle(request.data[0]));
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message));
    }
  };
};

export const addArticle = (article) => {
  return async (dispatch) => {
    try {
      const request = await axios.post(
        `/api/articles/admin/add_articles`,
        article,
        getAuthHeader()
      );
      dispatch(articles.addArticle(request.data));
      dispatch(articles.successGlobal("Article added!"));

      console.log(request);
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message));
    }
  };
};

export const getPaginateArticles = (page = 1, limit = 5) => {
  return async (dispatch) => {
    try {
      const request = await axios.post(
        `/api/articles/admin/paginate`,
        { page, limit },
        getAuthHeader()
      );
      dispatch(articles.getPaginateArticles(request.data));
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message));
    }
  };
};

export const changeArticleStatus = (status, _id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.patch(
        `/api/articles/admin/${_id}`,
        { status },
        getAuthHeader()
      );
      let article = response.data;
      let state = getState().articles.adminArticles.docs; // previous state
      let position = state.findIndex((article) => article._id === _id);
      state[position] = article;

      dispatch(articles.changeArticleStatus(state));
      dispatch(articles.successGlobal("Article status changed."));
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message));
    }
  };
};

export const removeArticle = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `/api/articles/admin/${id}`,
        getAuthHeader()
      );

      dispatch(articles.removeArticle());
      dispatch(articles.successGlobal());
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message));
    }
  };
};

export const getAdminArticleById = (id) => {
  return async (dispatch) => {
    try {
      const request = await axios.get(
        `/api/articles/admin/${id}`,
        getAuthHeader()
      );
      dispatch(articles.getArticle(request.data));
    } catch (error) {
      dispatch(articles.getArticle(error.response.data.message));
    }
  };
};

export const updateArticle = (article, id) => {
  return async (dispatch) => {
    try {
      const updatedArticle = await axios.patch(
        `/api/articles/admin/${id}`,
        article,
        getAuthHeader()
      );
      dispatch(articles.getArticle(updatedArticle.data));
      dispatch(articles.successGlobal("Article Updated."));
    } catch (error) {
      dispatch(articles.getArticle(error.response.data.message));
    }
  };
};

export const getNavSearchResults = (page = 1, limit = 5, keywords = "") => {
  return async (dispatch) => {
    try {
      const request = await axios.post(`/api/articles/user/search`, {
        keywords,
        page,
        limit,
      });
      dispatch(articles.navSearch(request.data));
    } catch (error) {
      dispatch(articles.getArticle(error.response.data.message));
    }
  };
};

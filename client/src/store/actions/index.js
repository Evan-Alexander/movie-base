import {
  GET_ARTICLES,
  GET_ARTICLE_BY_ID,
  GET_ADMIN_ARTICLES,
  ADD_ARTICLE,
  CLEAR_ARTICLE,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATIONS,
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SITE_LAYOUT,
} from "../types";

/////// articles ////////
export const getArticles = (articles) => ({
  type: GET_ARTICLES,
  payload: articles,
});

export const getArticle = (article) => ({
  type: GET_ARTICLE_BY_ID,
  payload: article,
});

export const clearArticle = () => ({
  type: CLEAR_ARTICLE,
});

/////// admin articles ////////
export const addArticle = (article) => ({
  type: ADD_ARTICLE,
  payload: article,
});

export const getPaginateArticles = (articles) => ({
  type: GET_ADMIN_ARTICLES,
  payload: articles,
});

/////// notifications ////////
export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload: msg,
});

export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg,
});

export const clearNotifications = () => {
  return (dispacth) => {
    dispacth({
      type: CLEAR_NOTIFICATIONS,
    });
  };
};

/////// auth ////////
export const authUser = (user) => ({
  type: AUTH_USER,
  payload: user,
});

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

/////// site ////////
export const appLayout = (layout) => ({
  type: SITE_LAYOUT,
  payload: layout,
});

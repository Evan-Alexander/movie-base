import {
  GET_ARTICLES,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATIONS,
  AUTH_USER,
  LOGIN_USER,
} from "../types";

/////// articles ////////
export const getArticles = (articles) => ({
  type: GET_ARTICLES,
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
import {
  GET_ARTICLES,
  GET_ARTICLE_BY_ID,
  CLEAR_ARTICLE,
  ADD_ARTICLE,
  GET_ADMIN_ARTICLES,
  CHANGE_ARTICLE_STATUS,
} from "../types";

export default function articleReducer(state = {}, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload };
    case GET_ARTICLE_BY_ID:
      return { ...state, current: action.payload };
    case ADD_ARTICLE:
      return { ...state, articleAdded: action.payload, success: true };
    case GET_ADMIN_ARTICLES:
      return { ...state, adminArticles: action.payload };
    case CHANGE_ARTICLE_STATUS:
      return {
        ...state,
        adminArticles: {
          ...state.adminArticles,
          docs: action.payload,
        },
      };
    case CLEAR_ARTICLE:
      return { ...state, current: "" };
    default:
      return state;
  }
}

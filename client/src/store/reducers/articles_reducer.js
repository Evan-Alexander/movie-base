import { GET_ARTICLES, GET_ARTICLE_BY_ID, CLEAR_ARTICLE } from "../types";

export default function articleReducer(state = {}, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload };
    case GET_ARTICLE_BY_ID:
      return { ...state, current: action.payload };
    case CLEAR_ARTICLE:
      return { ...state, current: "" };
    default:
      return state;
  }
}

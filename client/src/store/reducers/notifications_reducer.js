import {
  CLEAR_NOTIFICATIONS,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  REMOVE_ARTICLE,
} from "../types";

export default function notificationREducer(state = {}, action) {
  switch (action.type) {
    case ERROR_GLOBAL:
      return { ...state, error: true, msg: action.payload };
    case SUCCESS_GLOBAL:
      return { ...state, success: true, msg: action.payload };
    case CLEAR_NOTIFICATIONS:
      return {};
    case REMOVE_ARTICLE:
      return { ...state, articleRemoved: true };
    default:
      return state;
  }
}

import * as users from "./index";
import axios from "axios";
import {
  getAuthHeader,
  removeTokenCookie,
  getTokenCookie,
} from "../../utils/tools";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const registerUser = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/users/register`, {
        email: values.email,
        password: values.password,
      });

      dispatch(users.authUser({ data: user.data, auth: true }));
      dispatch(
        users.successGlobal(
          "Welcome !!.Check you email and validate your account"
        )
      );
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(users.errorGlobal("Oops, something went wrong."));
    }
  };
};

export const loginUser = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/users/signin`, {
        email: values.email,
        password: values.password,
      });

      dispatch(users.authUser({ data: user.data, auth: true }));
      dispatch(users.successGlobal("Welcome !!"));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(users.errorGlobal("Oops, something went wrong."));
    }
  };
};

export const isAuthUser = () => {
  return async (dispatch) => {
    try {
      if (!getTokenCookie) {
        throw new Error();
      }
      const user = await axios.get(`/api/users/isauth`, getAuthHeader());
      dispatch(users.authUser({ data: user.data, auth: true }));
    } catch (error) {
      dispatch(users.authUser({ data: {}, auth: false }));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    removeTokenCookie();
    dispatch(users.logoutUser());
  };
};

export const changeEmail = (data) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `/api/users/update_email`,
        {
          email: data.email,
          newemail: data.newemail,
        },
        getAuthHeader()
      );
      dispatch(users.changeUserEmail(data.newemail));
      dispatch(users.successGlobal("Email changed."));
    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.message));
    }
  };
};

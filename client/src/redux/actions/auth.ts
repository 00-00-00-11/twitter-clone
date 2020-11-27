import { Dispatch } from "react";
import Profile from "../../interfaces/Profile";
import User from "../../interfaces/User";
import { handleRequest, isSuccess } from "../../lib/functions";
import Logger from "../../lib/Logger";
import { AUTHENTICATE, AUTH_ERROR } from "../types";
import Response from "../../interfaces/Response";

interface IDispatch {
  type: string;
  isAuth?: boolean;
  loading?: boolean;
  user?: User;
  profile?: Profile;
  error?: string;
}

export const login = (data: object) => async (dispatch: Dispatch<IDispatch>) => {
  dispatch({ type: "SET_LOADING", loading: true });
  try {
    const res: Response = await handleRequest("/auth/login", "POST", data);

    if (isSuccess(res)) {
      dispatch({
        type: AUTHENTICATE,
        loading: false,
        isAuth: true,
        user: res.data.user,
        profile: res.data.profile,
      });
      return (window.location.href = "/");
    } else {
      dispatch({
        type: AUTH_ERROR,
        error: res.data.error,
      });
    }
  } catch (e) {
    Logger.error("login", e);
  }

  dispatch({ type: "SET_LOADING", loading: false });
};

export const checkAuth = () => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res: Response = await handleRequest("/auth", "POST");

    if (isSuccess(res)) {
      dispatch({
        type: AUTHENTICATE,
        user: res.data.user,
        isAuth: true,
        loading: false,
      });
    } else {
      dispatch({
        type: AUTH_ERROR,
        isAuth: false,
        loading: false,
        error: res.data.error,
      });
    }
  } catch (e) {
    Logger.error("checkAuth", e);
  }
};

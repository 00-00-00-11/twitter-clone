import Profile from "../../interfaces/Profile";
import State from "../../interfaces/State";
import User from "../../interfaces/User";
import { AUTHENTICATE, AUTH_ERROR } from "../types";

const initState: State["auth"] = {
  isAuth: false,
  loading: false,
  profile: null,
  user: null,
  error: null,
};

type Actions =
  | {
      type: typeof AUTHENTICATE;
      isAuth: boolean;
      loading: boolean;
      profile: Profile;
      user: User;
    }
  | {
      type: typeof AUTH_ERROR;
      error: string;
    }
  | {
      type: "SET_LOADING";
      loading: boolean;
    };
export default function authReducer(state = initState, action: Actions) {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        ...state,
        isAuth: action.isAuth,
        loading: action.loading,
        user: action.user,
        profile: action.profile,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        isAuth: false,
        loading: false,
        user: null,
        profile: null,
        error: action.error,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return {
        ...state,
      };
  }
}

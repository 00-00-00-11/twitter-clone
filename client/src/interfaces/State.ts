import Profile from "./Profile";
import User from "./User";

export default interface State {
  auth: {
    loading: boolean;
    isAuth: boolean;
    user: User | null;
    profile: Profile | null;
    error: string | null;
  };
}

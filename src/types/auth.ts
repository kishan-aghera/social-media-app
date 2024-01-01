import { IUser } from "./users";

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type INewUserSession = {
  email: string;
  password: string;
};

export type IAuthContext = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "62fbbac0fc43164624bea53b",
    username: "Jane",
    email: "jane@gmail.com",
    password: "$2b$10$PRKZXeDuxn2S0iIphQyLqOXosUGATLogiFrmhRWSKvJ//Vs9yMmFq",
    profilePicture: "person/7.jpeg",
    coverPicture: "post/9.jpeg",
    followers: [],
    followings: [],
    isAdmin: false,
    desc: "please work",
    city: "Cape Town",
    from: "Mumbai",
    relationship: 2,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

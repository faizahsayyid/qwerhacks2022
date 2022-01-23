import React, { createContext, useReducer } from "react";
import GlobalReducer from "./GlobalReducer";
import { GLOBAL_ACTIONS } from "./GlobalActions";

const initialState = {
  userId: "",
  isLoggedIn: false,
  username: "",
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const setUserId = (userId) => {
    dispatch({ type: GLOBAL_ACTIONS.SET_USER_ID, payload: userId });
  };

  const setIsLoggedIn = (value) => {
    dispatch({ type: GLOBAL_ACTIONS.SET_IS_LOGGED_IN, payload: value });
  };

  const setUsername = (username) => {
    dispatch({ type: GLOBAL_ACTIONS.SET_USERNAME, payload: username });
  };

  return (
    <GlobalContext.Provider
      value={{
        userId: state.userId,
        isLoggedIn: state.isLoggedIn,
        username: state.username,
        setUserId,
        setIsLoggedIn,
        setUsername,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

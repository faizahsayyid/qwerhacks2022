import React, { createContext, useReducer } from "react";
import GlobalReducer from "./GlobalReducer";
import { GLOBAL_ACTIONS } from "./GlobalActions";

const initialState = {
  userId: "",
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const setUserId = (userId) => {
    dispatch({ type: GLOBAL_ACTIONS.SET_USER_ID, payload: userId });
  };

  return (
    <GlobalContext.Provider
      value={{
        userId: state.userId,
        setUserId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

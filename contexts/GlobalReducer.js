import { GLOBAL_ACTIONS } from "./GlobalActions";

const GlobalReducer = (state, action) => {
  switch (action.type) {
    case GLOBAL_ACTIONS.SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

export default GlobalReducer;

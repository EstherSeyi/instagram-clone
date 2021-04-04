import { createContext, useReducer, useContext } from "react";

import actionReducer from "./reducers/action";

const initialState = {
  noOfLikes: 0,
  toggleLiked: null,
};
const ActionContext = createContext(initialState);

const ActionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(actionReducer, initialState);

  const setLikes = (noOfLikes) => {
    dispatch({
      type: "SET_LIKES",
      payload: {
        noOfLikes,
      },
    });
  };
  const setToggleLiked = (toggleLiked) => {
    dispatch({
      type: "SET_TOGGLE_LIKED",
      payload: {
        toggleLiked,
      },
    });
  };

  return (
    <ActionContext.Provider value={{ state, setLikes, setToggleLiked }}>
      {children}
    </ActionContext.Provider>
  );
};

const useAction = () => useContext(ActionContext);

export { ActionProvider, useAction };

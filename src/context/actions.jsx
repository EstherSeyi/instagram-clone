import { createContext, useReducer, useContext } from "react";

import actionReducer from "./reducers/action";

const initialState = {
  content: null,
  toggleLiked: false,
  likes: 0,
};
const ActionContext = createContext(initialState);

const ActionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(actionReducer, initialState);

  const setContent = (content) => {
    console.log(content, "KINDA");

    dispatch({
      type: "SET_CONTENT",
      payload: {
        content,
        likes: content.likes.length,
        toggleLiked: content.userLikedPhoto,
      },
    });
  };

  return (
    <ActionContext.Provider value={{ state, setContent }}>
      {children}
    </ActionContext.Provider>
  );
};

const useAction = () => useContext(ActionContext);

export { ActionProvider, useAction };

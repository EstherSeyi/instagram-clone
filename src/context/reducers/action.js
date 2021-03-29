const actionReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "SET_CONTENT":
      return {
        ...state,
        content: payload.content,
        likes: payload.likes,
        toggleLiked: payload.toggleLiked,
      };

    default:
      return {
        ...state,
      };
  }
};

export default actionReducer;

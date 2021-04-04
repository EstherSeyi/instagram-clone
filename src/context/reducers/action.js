const actionReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "SET_LIKES":
      return {
        ...state,
        noOfLikes: payload.noOfLikes,
      };
    case "SET_TOGGLE_LIKED":
      return {
        ...state,
        toggleLiked: payload.toggleLiked,
      };

    default:
      return {
        ...state,
      };
  }
};

export default actionReducer;

export const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "LOGGED_IN":
      return {
        ...state,
        user: payload.user,
        isLoggedIn: true,
        authenticating: false,
      };
    case "LOGGED_OUT":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        authenticating: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: payload,
      };
    case "SET_AUTH_ERROR":
      return {
        ...state,
        error: payload.error,
        authenticating: false,
        isLoggedIn: false,
        user: null,
      };
    case "SET_USER":
      return {
        ...state,
        user: payload.user,
      };
    case "CLEAR_AUTH_ERROR":
      return {
        ...state,
        error: "",
      };

    default:
      return {
        ...state,
      };
  }
};

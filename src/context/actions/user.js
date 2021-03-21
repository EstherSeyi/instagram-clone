export const setLoading = (payload) => ({
  type: "SET_LOADING",
  payload,
});

export const setLoggedIn = (payload) => ({
  type: "LOGGED_IN",
  payload: {
    user: payload,
  },
});

export const setAuthError = (payload) => ({
  type: "SET_AUTH_ERROR",
  payload: { error: payload },
});

export const clearAuthError = () => ({
  type: "CLEAR_AUTH_ERROR",
});

export const setLoggedOut = () => ({
  type: "LOGGED_OUT",
});

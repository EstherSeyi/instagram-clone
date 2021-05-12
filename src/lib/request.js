import Axios from "axios";

const instance = Axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      window.location.replace("/logout");
    }
    return Promise.reject(error);
  }
);

export default instance;

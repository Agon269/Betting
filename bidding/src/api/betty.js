import axios from "axios";

const betty = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  params: {},
  headers: {
    "Content-Type": "application/json",
  },
});

//interceptor for auth header

betty.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default betty;

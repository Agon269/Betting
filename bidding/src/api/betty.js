import axios from "axios";

let localApi = "http://localhost:5000/api";

const betty = axios.create({
  baseURL: localApi,
  params: {},
  headers: {
    "Content-Type": "application/json",
  },
});
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

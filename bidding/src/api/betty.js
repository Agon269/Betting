import axios from "axios";

let localApi = "http://localhost:5000/api";
// let deplApi = "https://frozen-taiga-24724.herokuapp.com/api";
export default axios.create({
  baseURL: localApi,
  params: {},
  headers: {
    "Content-Type": "application/json",
  },
});

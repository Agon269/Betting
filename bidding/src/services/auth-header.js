//get token from browser
//set it to axios on default
import axios from "axios";
export default function authHeaqder(token) {
  //later use the token param
  if (token) {
    axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

// Utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // must include protocol
  // timeout: 10000, // optional timeout
});

export default instance;

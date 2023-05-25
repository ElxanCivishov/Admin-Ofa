import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://api.ofa.az/api",
  // withCredentials: true,
});

export default newRequest;

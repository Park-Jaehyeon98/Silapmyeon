import axios from "axios";

const instance = axios.create({
  baseURL: "https://k9b107a.p.ssafy.io/api",
});

export default instance;

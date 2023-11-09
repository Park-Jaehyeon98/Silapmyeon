import axios from "axios";

const BASE_URL = "https://silapmyeon.com/api";
// const BASE_URL = "http://localhost:8080";

const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosAuth.interceptors.request.use(
  (config) => {
    const TOKEN = JSON.parse(sessionStorage.getItem("user"))?.UserAtom
      .accessToken;

    console.log("axiosAuth test >> " + TOKEN);
    config.headers["Authorization"] = `${TOKEN}`;
    console.log("header: " + config.headers["Authorization"]);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      try {
        const originalRequest = error.config;

        const RTK = JSON.parse(sessionStorage.getItem("user"))?.UserAtom
          .refreshToken;
        // 토큰 재발급
        const data = await axios({
          method: "POST",
          url: BASE_URL + "/token/reissue",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            Authorization: RTK,
          },
        });

        if (data) {
          const { accessToken } = data.data;
          // console.log("재발급된 ATK: " + accessToken);

          const user = JSON.parse(sessionStorage.getItem("user"));
          user.UserAtom.accessToken = accessToken;
          sessionStorage.setItem("user", JSON.stringify(user));
          originalRequest.headers["Authorization"] = accessToken;

          return await axiosAuth.request(originalRequest);
        }
      } catch (error) {
        console.log(error);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export { BASE_URL, axiosAuth };

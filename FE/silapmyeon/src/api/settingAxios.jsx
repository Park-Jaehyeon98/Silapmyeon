import axios from 'axios';

const BASE_URL = 'https://k9b107a.p.ssafy.io/api';

const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*", 
  },
});

axiosAuth.interceptors.request.use(
  (config) => {
    const TOKEN = JSON.parse(sessionStorage.getItem('user'))?.UserAtom.accessToken;
    
    console.log("axiosAuth test >> " + TOKEN);
    config.headers['Authorization'] = `${TOKEN}`;
    console.log("header: " + config.headers['Authorization'])
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { BASE_URL, axiosAuth };
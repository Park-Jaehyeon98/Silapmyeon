import axios from "axios";

const jwt = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo5LFwidXNlckVtYWlsXCI6XCJva2lwMDQyOEBnbWFpbC5jb21cIixcInJvbGVcIjpcIlJPTEVfVVNFUlwiLFwidHlwZVwiOlwiQVRLXCJ9IiwiaWF0IjoxNjk5MzE5MzE3LCJleHAiOjE3MDA1Mjg5MTd9.lEnScHqHYfTPgwbLH_TAA8PViRf1aZtC-DTc67xHAwk",
};

const instance = axios.create({
  baseURL: "https://k9b107a.p.ssafy.io/api",
  headers: jwt,
});

export default instance;

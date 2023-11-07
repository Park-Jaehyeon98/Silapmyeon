import axios from "axios";

const jwt = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo5LFwidXNlckVtYWlsXCI6XCJva2lwMDQyOEBnbWFpbC5jb21cIixcInJvbGVcIjpcIlJPTEVfVVNFUlwiLFwidHlwZVwiOlwiQVRLXCJ9IiwiaWF0IjoxNjk5MzQ0NTQyLCJleHAiOjE3MDA1NTQxNDJ9.3y_68Q1WIih3Up5oOhJfO7Mafi9NUIM-EhpozT0dVe8",
};

const instance = axios.create({
  baseURL: "https://silapmyeon.com/api",
  headers: jwt,
});

export default instance;

import axios from "axios";

const jwt = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo5LFwidXNlckVtYWlsXCI6XCJva2lwMDQyOEBnbWFpbC5jb21cIixcInJvbGVcIjpcIlJPTEVfVVNFUlwiLFwidHlwZVwiOlwiQVRLXCJ9IiwiaWF0IjoxNjk5Mjg5OTQwLCJleHAiOjE3MDA0OTk1NDB9.eg0GtDJfzc3xZpkwb7C6NRsY0DThe6hmTIzLhyNkga4",
};

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: jwt,
});

export default instance;

import axios from "axios";

const jwt = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo5LFwidXNlckVtYWlsXCI6XCJva2lwMDQyOEBnbWFpbC5jb21cIixcInJvbGVcIjpcIlJPTEVfVVNFUlwiLFwidHlwZVwiOlwiQVRLXCJ9IiwiaWF0IjoxNjk5NDA1MTI0LCJleHAiOjE3MDA2MTQ3MjR9.9Ey4DXj63_4AOd3OAC6SQ5ICmvc0xnWLifgwlMyLwJg",
};

const instance = axios.create({
  baseURL: "https://silapmyeon.com/api",
  headers: jwt,
});

export default instance;

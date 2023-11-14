// api.js
import axios from 'axios';
import { axiosAuth } from "./settingAxios";

// API의 기본 URL 설정
const API_BASE_URL = 'https://silapmyeon.com/api';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: API_BASE_URL,
});

// get list
export const getReportsByUserId = async (userId) => {
  try {
    const response = await axiosAuth.get('/report/list/', {
      headers: {
        'userId': userId
      }
    });
    return response.data;
  } catch (error) {
    // 에러를 호출한 쪽으로 전파
    throw error;
  }
};

// get detail
export const getReportById = async (id) => {
  try {
    const response = await axiosAuth.get('/report/detail/' + id);
    return response.data;
  } catch (error) {
    // 에러를 호출한 쪽으로 전파
    throw error;
  }
};

// get detail
export const deleteReportById = async (id) => {
  try {
    const response = await axiosAuth.delete('/report/' + id);
  } catch (error) {
    // 에러를 호출한 쪽으로 전파
    throw error;
  }
};

// api.js
import axios from 'axios';

// API의 기본 URL 설정
const API_BASE_URL = 'https://k9b107a.p.ssafy.io/api';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: API_BASE_URL,
});

// 데이터를 가져오는 함수
export const getReportsByUserId = async (userId) => {
  try {
    const response = await instance.get('/report/list/' + userId, {
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjoxMSxcInVzZXJFbWFpbFwiOlwiZWtjbHN0a2ZrYTQ0QG5hdmVyLmNvbVwiLFwicm9sZVwiOlwiUk9MRV9VU0VSXCIsXCJ0eXBlXCI6XCJBVEtcIn0iLCJpYXQiOjE2OTg5ODQ1MTIsImV4cCI6MTcwMDE5NDExMn0.6V7Lb2oGxHLk4kyx8pYNBOZuO56H_-ClFR3TopSvYdM`
          }
    });
    return response.data;
  } catch (error) {
    // 에러를 호출한 쪽으로 전파
    throw error;
  }
};

// FetchData.js
import React, { useState, useEffect } from 'react';
import { getReportsByUserId } from '../../api'; // api.js에서 함수를 임포트
import { useParams } from 'react-router-dom';

const ReportListView = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const {userId} = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        // api.js의 fetchData 함수를 호출
        const result = await getReportsByUserId(userId);
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    getData();
  }, []);

  // 에러가 발생했을 때 처리
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 데이터가 로딩 중일 때 처리
  if (!data) {
    return <div>Loading...</div>;
  }

  // 데이터가 있지만 배열이 비어있을 때 처리
  if (Array.isArray(data) && data.length === 0) {
    return <div>레포트가 존재하지 않습니다.</div>;
  }

  // 데이터를 카드 형식으로 렌더링
  return (
    <div>
      {data.map((item, index) => (
        <div key={index} className="card">
          <div className="card-body" style={"border-line: solid"}>
            <h5 className="card-title">{item.company}</h5>
            <p className="card-text">{item.createdTime}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportListView

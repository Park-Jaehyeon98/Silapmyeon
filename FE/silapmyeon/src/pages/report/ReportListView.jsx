// FetchData.js
import React, { useState, useEffect } from 'react';
import { getReportsByUserId } from '../../api/report'; // api.js에서 함수를 임포트
import { useParams } from 'react-router-dom';
import styles from '../../styles/reportList.module.css'
import clip from '../../assets/clip.png'
import leftArrow from '../../assets/left-arrow.png'

function formatDate(dateTimeString) {
  // '-'를 기준으로 문자열을 년, 월, 일, 시, 분, 초로 나눕니다.
  const parts = dateTimeString.split('-');

  // 날짜 부분과 시간 부분을 재조합합니다.
  const datePart = parts.slice(0, 3).join('-'); // '2023-11-03'
  const timePart = parts.slice(3).join(':'); // '07:59:37'

  // 날짜 부분과 시간 부분을 하나의 문자열로 연결합니다.
  return datePart + ' ' + timePart;
}

const ReportListView = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const {userId} = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 8; // 한 페이지에 표시될 항목 수

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

  // 페이지 이동 함수
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // 현재 페이지의 데이터 계산
  const currentData = data ? data.slice(currentPage * pageSize, (currentPage + 1) * pageSize) : [];

  // 에러가 발생했을 때 처리
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 데이터가 로딩 중일 때 처리
  if (!data) {
    return <div>Loading...</div>;
  }

  // 데이터가 있지만 배열이 비어있을 때 처리
  //추후 에러 처리를 통하여 리팩토링 해야함.
  if (Array.isArray(data) && data.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>실전 연습 레포트</div>
        <div className={styles.subHeader}>
          🔍 
          <input 
            type="text" 
            placeholder="기업명 검색" 
            className={styles.searchInput}
          />
        </div>
        <div className={styles.gridContainer}>
          <p>레포트가 존재하지 않습니다.</p>
          <p>면접 연습을 진행하세요.</p>
        </div>
      </div>
    );
  }

  // 데이터를 카드 형식으로 렌더링
  return (
    <div className={styles.container}>
      <div className={styles.header}>실전 연습 레포트</div>
      <div className={styles.gridContainer}>
        <div className={styles.subHeader}>
        🔍 
        <input 
          type="text" 
          placeholder="기업명 검색" 
          className={styles.searchInput}
        />
        </div>
        <div className={styles.gridWrapper}>
          {/*이전 페이지 넘어가기 */}
          <img src={leftArrow} alt="clip" className={styles.arrow} onClick={currentPage > 0 ? prevPage : null} />
          {/*레포트 부분*/}
          <div className={styles.grid}>
            {/*레포트*/}
            {currentData.map((item, index) => (
              <div className={styles.card} key={index}>
                <img src={clip} alt="clip" className={styles.clip}/>
                <div className={styles.text}>
                  <p>{item.company}</p>
                  <p>REPORT</p>
                </div>
                <div className={styles.date}>{formatDate(item.createdTime)}</div>
              </div>
            ))}
          </div>
          {/* 다음으로 넘어가기 */}
          <img src={leftArrow} alt="clip" className={styles.arrow} onClick={currentData.length >= pageSize ? nextPage : null}/>
        </div>
      </div>
    </div>
  );
};

export default ReportListView

import React, { useState, useEffect } from "react";
import { getReportById } from "../../api/report";
import { deleteReportById } from "../../api/report";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/ReportDetail.module.css";

const ReportDetailView = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 실행할 코드, 예를 들면 데이터 fetching
    const getData = async () => {
      try {
        // api.js의 fetchData 함수를 호출
        const result = await getReportById(id);
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    getData();
  }, []);

  function formatCreatedTime(data) {
    const parts = data.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${year}년 ${month}월 ${day}일`;
  }

  const handleDelete = async () => {
    // 첫 번째 삭제 확인 팝업
    const isConfirmed = window.confirm("이 레포트를 삭제하시겠습니까?");
    if (isConfirmed) {
      try {
        // 삭제 로직 (API 호출 등)
        await deleteReportById(id); // 예시 API 호출 함수
        // 삭제 후 확인 팝업
        alert("레포트가 삭제되었습니다.");
        // 레포트 리스트 페이지로 이동
        navigate('/report/list/' + 1);
      } catch (error) {
        console.error('삭제 중 오류 발생', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 에러가 발생했을 때 처리
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 데이터가 로딩 중일 때 처리
  if (!data) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1>{data.company}</h1>
          <h1>모의 면접</h1>
          <h1>REPORT</h1>
        </div>
        <div className={styles.interviewContainer}>
          <h2>면접 문항</h2>
          {data.interviews.map((item, index) => (
            <div className={styles.interview} key={index}>
              <div className={styles.interviewItem}>
                <p>문항 {index + 1}</p>
              </div>
              <div className={styles.interviewItem}>
                <div className={styles.qna}>{item.question}</div>
                <div className={styles.qna}>{item.answer}</div>
              </div>
              <video
                className={styles.interviewItem}
                width="100%"
                height="300px"
                controls
              >
                <source src={item.url} type="video/webm" />
                video tag.
              </video>
            </div>
          ))}
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.deleteButton} onClick={handleDelete}>삭제</div>
          <div className={styles.createdTimeContainer}>
            <p>
              {formatCreatedTime(data.createdTime)}
              <br />
              면접자 OOO
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default ReportDetailView;

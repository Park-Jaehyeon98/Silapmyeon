import React, { useState, useEffect } from "react";
import { getReportById } from "../../api/report";
import { useParams } from "react-router-dom";
import styles from "../../styles/ReportDetail.module.css";

const ReportDetailView = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const { id } = useParams();

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
                <source src={item.url} type="video/mp4" />
                video tag.
              </video>
            </div>
          ))}
        </div>
        <div></div>
        <div></div>
      </div>
    );
  }
};

export default ReportDetailView;

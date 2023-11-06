import axios from "../../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ResumeDetailStyle.module.css";

function ResumeDetail() {
  const jwt = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo5LFwidXNlckVtYWlsXCI6XCJva2lwMDQyOEBnbWFpbC5jb21cIixcInJvbGVcIjpcIlJPTEVfVVNFUlwiLFwidHlwZVwiOlwiQVRLXCJ9IiwiaWF0IjoxNjk5MDg0MjA3LCJleHAiOjE3MDAyOTM4MDd9.KobaflC8-JxlhQBjHm32QzkFpqzKtixaW6hM247e2Qo",
    },
  };
  const [resume, setResume] = useState(null);
  const { resumeId } = useParams();

  const getResume = async () => {
    const res = await axios.get(`/resume/${resumeId}`, jwt);
    console.log(res.data);
    setResume(res.data);
  };

  const [num, setNum] = useState(0);
  const changeNum = (n) => {
    setNum(n);
  };

  useEffect(() => {
    getResume();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      {resume === null ? null : (
        <div>
          <div className={styles.title}>
            <div className={styles.titleText}>{resume.companyName} 자소서</div>
          </div>
          <div className={styles.interviewDate}>
            <div className={styles.interview}>면접일 </div>
            <div className={styles.date}>{resume.interviewDate} </div>
          </div>
          <div className={styles.box}>
            {/* 자소서 항목만큼 버튼 생성, 버튼 클릭시 해당 자소서 항목으로 전환 */}
            {resume.resumeItems.map((resumeItem, idx) => (
              <div>
                <button
                  key={idx}
                  className={`${styles.button} ${num == idx ? styles.selectedButton : ""}`}
                  onClick={() => changeNum(idx)}
                >
                  {idx + 1}
                </button>
              </div>
            ))}
            <div className={styles.content}>
              <div className={styles.question}>{resume.resumeItems[num].resumeQuestion}</div>
              <div className={styles.answer}>{resume.resumeItems[num].resumeAnswer}</div>
            </div>
          </div>
          <button className={styles.modify}>수정</button>
          <button className={styles.delete}>삭제</button>
        </div>
      )}
    </div>
  );
}

export default ResumeDetail;

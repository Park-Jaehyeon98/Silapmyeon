import axios from "../../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ResumeDetailStyle.module.css";

function ResumeDetail() {
  const [resume, setResume] = useState(null);
  const { resumeId } = useParams();

  const getResume = async () => {
    const res = await axios.get(`/resume/${resumeId}`);
    console.log(res.data);
    setResume(res.data);
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
              <div key={idx} className={styles.content}>
                <div className={styles.question}>
                  {resumeItem.resumeQuestion}
                </div>
                <div className={styles.answer}>{resumeItem.resumeAnswer}</div>
              </div>
            ))}
            {resume.resumeItems.map((resumeItem, idx) => (
              <button key={idx} className={styles.button}>
                {idx + 1}
              </button>
            ))}
          </div>
          <button className={styles.modify}>수정</button>
          <button className={styles.delete}>삭제</button>
        </div>
      )}
    </div>
  );
}

export default ResumeDetail;

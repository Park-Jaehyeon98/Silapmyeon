import axios from "../../api/api";
import { useState, useEffect } from "react";
import Resume from "../../components/resume/Resume";
import styles from "./ResumeListStyle.module.css";
import { Link } from "react-router-dom";

function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const getResumes = async () => {
    const res = await axios.get("/resume");
    console.log(res.data.content);
    setResumes(res.data.content);
  };

  useEffect(() => {
    getResumes();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div className={styles.resumeTitle}>
        <div className={styles.resumeTitleText}>나의 자기소개서</div>
      </div>
      <Link to={"create"}>
        <button className={styles.plus}>+</button>
      </Link>
      <table
        style={{
          borderCollapse: "collapse",
          width: "896px",
          left: "0%",
          marginTop: "50px",
          position: "relative",
        }}
      >
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.number}>번호</th>
            <th className={styles.companyName}>기업명</th>
            <th className={styles.interviewDate}>면접일</th>
            <th className={styles.createdDate}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume, idx) => (
            <Resume
              key={resume.resumeId}
              resumeId={resume.resumeId}
              companyName={resume.companyName}
              interviewDate={resume.interviewDate}
              createdTime={resume.createdTime}
              modifiedTime={resume.modifiedTime}
              reviewId={resume.reviewId}
              idx={idx}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResumeList;

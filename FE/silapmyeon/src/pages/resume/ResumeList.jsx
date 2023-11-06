import axios from "../../api/api";
import { useState, useEffect } from "react";
import Resume from "../../components/resume/Resume";
import styles from "./ResumeListStyle.module.css";
import { Link } from "react-router-dom";

function ResumeList() {
  const jwt = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo5LFwidXNlckVtYWlsXCI6XCJva2lwMDQyOEBnbWFpbC5jb21cIixcInJvbGVcIjpcIlJPTEVfVVNFUlwiLFwidHlwZVwiOlwiQVRLXCJ9IiwiaWF0IjoxNjk5MDg0MjA3LCJleHAiOjE3MDAyOTM4MDd9.KobaflC8-JxlhQBjHm32QzkFpqzKtixaW6hM247e2Qo",
    },
  };
  const [resumes, setResumes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const getResumes = async (page) => {
    const res = await axios.get(`/resume?page=${page}`, jwt);
    console.log(res.data.content);
    console.log(res.data);
    setResumes(res.data.content);
    setTotalPages(res.data.totalPages);
    console.log(currentPage);
  };

  useEffect(() => {
    getResumes(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageNums = [];
  const maxPagesToShow = 5;

  const startIndex = Math.floor(currentPage / maxPagesToShow) * 5;
  const endIndex = Math.min(totalPages, startIndex + 5);

  pageNums.push(
    <a
      style={{
        fontWeight: "bold",
      }}
      onClick={() => handlePageChange(startIndex - 1 < 0 ? 0 : startIndex - 1)}
    >
      이전
    </a>
  );
  for (let index = startIndex; index < endIndex; index++) {
    console.log("currentPage:", currentPage);
    console.log("index + 1:", index + 1);

    pageNums.push(
      <a
        key={index}
        onClick={() => handlePageChange(index)}
        className={`${styles.pageNum} ${currentPage == index ? styles.selectedPage : ""}`}
      >
        {index + 1}
      </a>
    );
  }
  pageNums.push(
    <a
      style={{
        fontWeight: "bold",
      }}
      onClick={() => handlePageChange(endIndex + 1 >= totalPages ? totalPages - 1 : endIndex + 1)}
    >
      다음
    </a>
  );

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
        <div className={styles.pageNums}>{pageNums}</div>
      </table>
    </div>
  );
}

export default ResumeList;

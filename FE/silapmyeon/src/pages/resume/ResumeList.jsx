import { axiosAuth } from "../../api/settingAxios";
import { useState, useEffect } from "react";
import Resume from "../../components/resume/Resume";
import styles from "./ResumeListStyle.module.css";
import { Link } from "react-router-dom";

function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const getResumes = async (page) => {
    const res = await axiosAuth.get(`/resume?page=${page}&keyword=${keyword}`);
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
      className={styles.pn}
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
        className={`${styles.pageNum} ${
          currentPage == index ? styles.selectedPage : ""
        }`}
      >
        {index + 1}
      </a>
    );
  }
  pageNums.push(
    <a
      className={styles.pn}
      onClick={() =>
        handlePageChange(
          endIndex + 1 >= totalPages ? totalPages - 1 : endIndex + 1
        )
      }
    >
      다음
    </a>
  );

  const [keyword, setKeyword] = useState("");
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    console.log(keyword);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getResumes();
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className={styles.resumeTitle}>
        <div className={styles.resumeTitleText}>나의 자기소개서</div>
      </div>
      <div className={styles.searchBoxText}>🔎</div>
      <input
        value={keyword}
        className={styles.searchBox}
        placeholder="기업명 검색"
        onChange={handleKeywordChange}
        onKeyUp={handleKeyPress}
      />
      <Link to={"create"}>
        <button className={styles.plus}>+</button>
      </Link>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>번호</th>
            <th>기업명</th>
            <th>면접일</th>
            <th>작성일</th>
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
              idx={currentPage * 10 + idx}
            />
          ))}
        </tbody>
        {pageNums.length === 2 ? null : (
          <div className={styles.pageNums}>{pageNums}</div>
        )}
      </table>
    </div>
  );
}

export default ResumeList;

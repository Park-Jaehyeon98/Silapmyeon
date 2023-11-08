import { useEffect, useState } from "react";
import axios from "../../api/api";
import styles from "./ReviewModalStyle.module.css";

function ReviewModal({ onModalChange }) {
  const closeModal = () => {
    const flag = false;
    const newCompanyName = null;
    const newInterviewDate = null;
    const newResumeId = 0;
    onModalChange(flag, newCompanyName, newInterviewDate, newResumeId);
  };

  const [resumes, setResumes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageNums = [];
  const maxPagesToShow = 5;
  const startIndex = Math.floor(currentPage / maxPagesToShow) * 5;
  const endIndex = Math.min(totalPages, startIndex + 5);

  const getResumes = async (page) => {
    const res = await axios.get(`/resume?page=${page}`);
    console.log(res.data.content);
    console.log(res.data);
    setResumes(res.data.content);
    setTotalPages(res.data.totalPages);
    console.log(currentPage);
  };

  // 페이지네이션
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getResumes(currentPage);
  }, [currentPage]);

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
      style={{
        fontWeight: "bold",
      }}
      onClick={() =>
        handlePageChange(
          endIndex + 1 >= totalPages ? totalPages - 1 : endIndex + 1
        )
      }
    >
      다음
    </a>
  );

  const sendInfo = (companyName, interviewDate, resumeId) => {
    const flag = false;
    const newCompanyName = companyName;
    const newInterviewDate = interviewDate;
    const newResumeId = resumeId;
    onModalChange(false, newCompanyName, newInterviewDate, newResumeId);
  };

  return (
    <div>
      <table border={1}>
        <th>
          <th>번호</th>
          <th>기업명</th>
          <th>면접일</th>
          <th>작성일</th>
        </th>

        {resumes.map((resume, idx) => {
          return (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td
                onClick={() =>
                  sendInfo(
                    resume.companyName,
                    resume.interviewDate,
                    resume.resumeId
                  )
                }
              >
                {resume.companyName}
              </td>
              <td>{resume.interviewDate}</td>
              <td>{resume.createdTime}</td>
            </tr>
          );
        })}
      </table>
      <div>{pageNums}</div>
      모달입니다.
      <button onClick={closeModal}>닫기</button>
    </div>
  );
}

export default ReviewModal;

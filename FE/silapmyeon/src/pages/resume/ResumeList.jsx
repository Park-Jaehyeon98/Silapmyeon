import axios from "../../api/api";
import { useState, useEffect } from "react";
import Resume from "../../components/resume/Resume";
import "./ResumeListStyle.css";
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
    <div>
      <div className="resumeTitle">
        <div className="resumeTitleText">나의 자기소개서</div>
      </div>
      <Link to={"create"}>
        <button className="plus">+</button>
      </Link>
      <table
        style={{
          borderCollapse: "collapse",
          width: "896px",
          left: "418px",
          top: "274px",
          position: "absolute",
        }}
      >
        <thead>
          <tr className="tableHeader">
            <th className="number">번호</th>
            <th className="companyName">기업명</th>
            <th className="interviewDate">면접일</th>
            <th className="createdDate">작성일</th>
          </tr>
        </thead>
        <tbody
          style={{
            left: "418px",
            top: "336px",
            width: "896px",
            position: "fixed",
          }}
        >
          {resumes.map((resume) => (
            <Resume
              key={resume.resumeId}
              resumeId={resume.resumeId}
              companyName={resume.companyName}
              interviewDate={resume.interviewDate}
              createdTime={resume.createdTime}
              modifiedTime={resume.modifiedTime}
              reviewId={resume.reviewId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResumeList;

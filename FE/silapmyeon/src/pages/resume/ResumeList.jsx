import axios from "../../api/api";
import { useState, useEffect } from "react";
import Resume from "../../components/resume/Resume";
import "./ResumeListStyle.css";
import {Link} from "react-router-dom"

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
      <h2 className="title">나의 자기소개서</h2>
      <table style={{borderCollapse: "collapse", width: "896px"}}>
          <tr className="top">
            <th className="num">번호</th>
            <th className="companyName">기업명</th>
            <th className="interview">면접일</th>
            <th className="create">작성일</th>
          </tr>
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
      </table>
    </div>
  );
}

export default ResumeList;

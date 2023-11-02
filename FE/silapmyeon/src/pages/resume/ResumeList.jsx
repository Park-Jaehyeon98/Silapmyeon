import axios from "../../api/api";
import { useState, useEffect } from "react";
import Resume from "../../components/resume/Resume";

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
      <h2>나의 자기소개서</h2>
      <table>
          <tr>
            <th>번호</th>
            <th>기업명</th>
            <th>면접일</th>
            <th>작성일</th>
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

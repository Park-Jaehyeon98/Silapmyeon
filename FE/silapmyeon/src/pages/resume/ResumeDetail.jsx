import axios from "../../api/api";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import "./ResumeDetailStyle.css"

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
    <div>
      {resume === null ? null :  (
        <div>
          <h2 className="title">{resume.companyName} 자소서</h2>
          <h2 className="interviewDate">면접일 {resume.interviewDate}</h2>
          {resume.resumeItems.map((resumeItem, idx) => (
            <div key={idx} className="content">
              <h2>{resumeItem.resumeQuestion}</h2>
              <p>{resumeItem.resumeAnswer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumeDetail;

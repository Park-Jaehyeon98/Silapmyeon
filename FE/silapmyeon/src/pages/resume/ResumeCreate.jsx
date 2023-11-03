import { useState } from "react";
import axios from "../../api/api";
import ResumeItemForm from "../../components/resume/ResumeItemForm";
import "./ResumeCreateStyle.css";

function ResumeCreate() {
  const [items, setItems] = useState([<ResumeItemForm />]);

  const addItem = () => {
    setItems((prevItems) => [...prevItems, <ResumeItemForm />]);
  };

  const [companyName, setCompanyName] = useState();
  const [interviewDate, setInterviewDate] = useState();
  const [user, setUser] = useState(1);
  const [resumeItems, setResumeItems] = useState([]);

  const companyNameChange = (event) => {
    setCompanyName(event.target.value);
    console.log(companyName);
  };

  const interviewDateChange = (event) => {
    setInterviewDate(event.target.value);
    console.log(interviewDate);
  };

  const registerResume = () => {};

  return (
    <div style={{ height: "100vh" }}>
      <div className="resumeCreateTitle">자기소개서 등록</div>
      <div className="resumeCreateCompany">
        <div className="resumeCreateCompanyName">기업명</div>
        <input
          className="rectangle105"
          onChange={companyNameChange}
          value={companyName}
        ></input>
      </div>
      <div className="interviewBox">
        <div className="interviewTitle">면접일</div>
        <input
          className="rectangle106"
          onChange={interviewDateChange}
          value={interviewDate}
        ></input>
      </div>
      <div style={{ left: "416px", top: "270px", position: "absolute" }}>
        {items.map((item, index) => (
          <div key={index} style={{ marginTop: "7%" }}>
            <ResumeItemForm idx={index} />
          </div>
        ))}
        <button className="itemPlus" onClick={addItem}>
          +
        </button>
        <button className="complete" onClick={registerResume}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ResumeCreate;

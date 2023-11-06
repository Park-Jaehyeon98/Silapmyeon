import { useState } from "react";
import axios from "../../api/api";
import ResumeItemForm from "../../components/resume/ResumeItemForm";
import styles from "./ResumeCreateStyle.module.css";

function ResumeCreate() {
  const [items, setItems] = useState([<ResumeItemForm />]);

  const addItem = () => {
    if (items.length >= 6) {
      alert("더 이상 자소서 항목을 추가할 수 없습니다.");
    } else {
      setItems((prevItems) => [...prevItems, <ResumeItemForm />]);
    }
  };

  const removeItem = () => {
    if (items.length == 1) {
      alert("최소 1개의 자소서 항목이 필요합니다.");
    } else {
      setItems((prevItems) => prevItems.slice(0, -1));
    }
  };

  const [companyName, setCompanyName] = useState();
  const [interviewDate, setInterviewDate] = useState();
  const [user, setUser] = useState(1);

  const companyNameChange = (event) => {
    setCompanyName(event.target.value);
    console.log(companyName);
  };

  const interviewDateChange = (event) => {
    // Get the user input value
    const inputValue = event.target.value;

    // Remove any non-numeric characters from the input
    const numericValue = inputValue.replace(/\D/g, "");

    // Ensure the numeric value is limited to 8 digits
    const formattedDate = numericValue.substring(0, 8);

    // Format the 8-digit numeric value as "yyyy-mm-dd"
    if (formattedDate.length >= 8) {
      const year = formattedDate.substring(0, 4);
      const month = formattedDate.substring(4, 6);
      const day = formattedDate.substring(6, 8);
      const formattedDateString = `${year}-${month}-${day}`;
      setInterviewDate(formattedDateString);
    } else {
      setInterviewDate(formattedDate);
    }
  };

  const registerResume = () => {};

  return (
    <div style={{ height: "100vh" }}>
      <div className={styles.resumeCreateTitle}>자기소개서 등록</div>
      <div className={styles.resumeCreateCompany}>
        <div className={styles.resumeCreateCompanyName}>기업명</div>
        <input
          className={styles.rectangle105}
          onChange={companyNameChange}
          value={companyName}
        ></input>
      </div>
      <div className={styles.interviewBox}>
        <div className={styles.interviewTitle}>면접일</div>
        <input
          className={styles.rectangle106}
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
        <button className={styles.itemPlus} onClick={addItem}>
          +
        </button>
        <button className={styles.itemMinus} onClick={removeItem}>
          -
        </button>
        <button className={styles.complete} onClick={registerResume}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ResumeCreate;

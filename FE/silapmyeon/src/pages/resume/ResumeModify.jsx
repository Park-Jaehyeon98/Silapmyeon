import { useState } from "react";
import axios from "../../api/api";
import ResumeItemForm from "../../components/resume/ResumeItemForm";
import styles from "./ResumeModify.module.css";
import { useLocation, useNavigate } from "react-router-dom";

function ResumeModify() {
  const location = useLocation();
  const { resume } = location.state;

  const [items, setItems] = useState(resume.resumeItems);

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
      setItemData((prevData) => prevData.slice(0, -1));
    }
  };

  const [companyName, setCompanyName] = useState(resume.companyName);
  const [interviewDate, setInterviewDate] = useState(resume.interviewDate);

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
    console.log(interviewDate);
  };

  const [itemData, setItemData] = useState(resume.resumeItems);
  const handleQuestionChange = (index, newQuestion) => {
    // Update the question at the specified index
    const updatedData = [...itemData];
    updatedData[index] = { ...updatedData[index], resumeQuestion: newQuestion };
    setItemData(updatedData);
    console.log(itemData);
  };

  const handleAnswerChange = (index, newAnswer) => {
    // Update the answer at the specified index
    const updatedData = [...itemData];
    updatedData[index] = { ...updatedData[index], resumeAnswer: newAnswer };
    setItemData(updatedData);
    console.log(itemData);
  };

  const navigate = useNavigate();

  // 빈 값 체크 함수
  const isEmpty = (input) => {
    if (
      typeof input === "undefined" ||
      input === null ||
      input === "" ||
      input === "null" ||
      input.length === 0 ||
      (typeof input === "object" && !Object.keys(input).length)
    ) {
      return true;
    } else return false;
  };

  const modifyResume = async () => {
    let flag = true;
    if (isEmpty(companyName)) {
      alert("기업명을 입력해주세요.");
      flag = false;
    }

    if (isEmpty(isEmpty(interviewDate))) {
      alert("날짜를 입력해주세요.");
      flag = false;
    }

    for (let index = 0; index < itemData.length; index++) {
      if (isEmpty(itemData[index].resumeAnswer) || isEmpty(itemData[index].resumeQuestion)) {
        alert("자소서 항목을 입력해주세요.");
        flag = false;
        break;
      }
    }
    // itemData now contains the questions and answers for each item
    // You can use this data to send to the server, for example:
    if (flag) {
      const res = await axios.put(`/resume/${resume.resumeId}`, {
        companyName,
        interviewDate,
        resumeItems: itemData,
      });
      console.log(res);
      navigate(`/resume/${resume.resumeId}`);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className={styles.title}>자기소개서 수정</div>
      <div className={styles.company}>
        <div className={styles.companyName}>기업명</div>
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
            <ResumeItemForm
              idx={index}
              onQuestionChange={handleQuestionChange}
              onAnswerChange={handleAnswerChange}
              question={item.resumeQuestion}
              answer={item.resumeAnswer}
            />
          </div>
        ))}
        <button className={styles.itemPlus} onClick={addItem}>
          +
        </button>
        <button className={styles.itemMinus} onClick={removeItem}>
          -
        </button>
        <button className={styles.complete} onClick={modifyResume}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ResumeModify;

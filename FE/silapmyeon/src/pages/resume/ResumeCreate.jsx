import { useState } from "react";
import ResumeItemForm from "../../components/resume/ResumeItemForm";
import styles from "./ResumeCreateStyle.module.css";
import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../../api/settingAxios";

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
      setItemData((prevData) => prevData.slice(0, -1));
    }
  };

  const [companyName, setCompanyName] = useState();
  const [interviewDate, setInterviewDate] = useState();

  const companyNameChange = (event) => {
    setCompanyName(event.target.value);
    // console.log(companyName);
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
    // console.log(interviewDate);
  };

  const [itemData, setItemData] = useState([]);
  const handleQuestionChange = (index, newQuestion) => {
    // Update the question at the specified index
    const updatedData = [...itemData];
    updatedData[index] = { ...updatedData[index], resumeQuestion: newQuestion };
    setItemData(updatedData);
    // console.log(itemData);
  };

  const handleAnswerChange = (index, newAnswer) => {
    // Update the answer at the specified index
    const updatedData = [...itemData];
    updatedData[index] = { ...updatedData[index], resumeAnswer: newAnswer };
    setItemData(updatedData);
    // console.log(itemData);
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

  const registerResume = async () => {
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
      if (
        isEmpty(itemData[index].resumeAnswer) ||
        isEmpty(itemData[index].resumeQuestion)
      ) {
        alert("자소서 항목을 입력해주세요.");
        flag = false;
        break;
      }
    }
    // itemData now contains the questions and answers for each item
    // You can use this data to send to the server, for example:

    if (flag) {
      const res = await axiosAuth.post("/resume", {
        companyName,
        interviewDate,
        resumeItems: itemData,
      });
      // console.log(res);
      navigate("/resume");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="head">자기소개서 등록</div>
      <div className={styles.row1}>
        <span className={styles.companyNameText}>기업명</span>
        <input
          className={styles.companyNameInput}
          onChange={companyNameChange}
          value={companyName}
        ></input>
        <span className={styles.interviewTitle}>면접일</span>
        <input
          placeholder="yyyymmdd"
          className={styles.interviewInput}
          onChange={interviewDateChange}
          value={interviewDate}
        ></input>
      </div>

      <div className={styles.box}>
        {items.map((item, index) => (
          <ResumeItemForm
            idx={index}
            onQuestionChange={handleQuestionChange}
            onAnswerChange={handleAnswerChange}
          />
        ))}

        <div className={styles.row2}>
          <button className={styles.itemPlus} onClick={addItem}>
            +
          </button>
          <button className={styles.itemMinus} onClick={removeItem}>
            -
          </button>
        </div>

        <button className={styles.complete} onClick={registerResume}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ResumeCreate;

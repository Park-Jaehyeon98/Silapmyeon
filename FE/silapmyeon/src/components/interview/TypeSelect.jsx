import { useState, useEffect } from "react";
import { axiosAuth } from "../../api/settingAxios";
import { useRecoilState } from "recoil";
import styles from "./TypeSelect.module.css";
import {
  selectedType,
  selectedQuestion,
  resumeId,
  questionCount,
} from "../../atoms/atoms";
import { Link } from "react-router-dom";
import Select from "react-select";

function TypeSelect() {
  const [selectedTypeState, setSelectedTypeState] =
    useRecoilState(selectedType);
  const [selectedQuestionState, setSelectedQuestionState] =
    useRecoilState(selectedQuestion);
  const [resumeIdState, setResumeIdState] = useRecoilState(resumeId);
  const [qCount, setQCount] = useRecoilState(questionCount);

  const [resumeList, setResumeList] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: 0,
    label: "자소서 선택",
  });

  const options = resumeList.map((item) => ({
    value: item.resumeId,
    label: `${item.companyName} ${item.interviewDate}`,
  }));

  const handleTypeButton = (event) => {
    setSelectedTypeState(event.target.value);
  };

  const handleQuestionButton = (event) => {
    setSelectedQuestionState(event.target.value);
  };

  const handleResumeChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setResumeIdState(selectedOption.value);
    console.log("id : " + selectedOption.value);
  };

  useEffect(() => {
    setSelectedTypeState("/interview/mock");
    setSelectedQuestionState("자소서");
    setResumeIdState(0);
    setQCount(0);

    axiosAuth.get("/resume?page=0&size=10").then((response) => {
      console.log(response.data.content);
      setResumeList(response.data.content);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>면접 유형을 선택해주세요.</h1>
      <h3>유형</h3>
      <div>
        <button
          className={`${styles.button} ${
            selectedTypeState === "/interview/mock" ? styles.selected : ""
          }`}
          value="/interview/mock"
          onClick={handleTypeButton}
        >
          모의 면접
        </button>

        <button
          className={`${styles.button} ${
            selectedTypeState === "/interview/self" ? styles.selected : ""
          }`}
          value="/interview/self"
          onClick={handleTypeButton}
        >
          자율 연습
        </button>

        <button
          className={`${styles.button} ${
            selectedTypeState === "/interview/practice" ? styles.selected : ""
          }`}
          value="/interview/practice"
          onClick={handleTypeButton}
        >
          연습 면접
        </button>
      </div>
      <h3>질문</h3>
      <div>
        <button
          className={`${styles.button} ${
            selectedQuestionState === "자소서" ? styles.selected : ""
          }`}
          value="자소서"
          onClick={handleQuestionButton}
        >
          자기소개서 기반 질문
        </button>

        <button
          className={`${styles.button} ${
            selectedQuestionState === "기술" ? styles.selected : ""
          }`}
          value="기술"
          onClick={handleQuestionButton}
        >
          기술 질문
        </button>

        <button
          className={`${styles.button} ${
            selectedQuestionState === "인성" ? styles.selected : ""
          }`}
          value="인성"
          onClick={handleQuestionButton}
        >
          인성 질문
        </button>
      </div>

      <h3>자소서</h3>
      <h3>자소서 기반 질문의 경우 필수로 선택해야 합니다.</h3>
      <Select
        value={selectedOption}
        onChange={handleResumeChange}
        options={options}
        styles={{
          control: (provided, state) => ({
            ...provided,
            width: 300,
          }),
        }}
      />
      <br />
      <Link to={"/interview/preparation"}>
        <button className={styles.button}>다음</button>
      </Link>
    </div>
  );
}

export default TypeSelect;

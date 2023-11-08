import { useState, useEffect } from "react";
import axios from "../../api/api";
import { useRecoilState } from "recoil";
import {
  selectedType,
  selectedQuestion,
  resumeId,
  questionCount,
} from "../../atoms/atoms";
import { Link } from "react-router-dom";

function TypeSelect() {
  const [selectedTypeState, setSelectedTypeState] =
    useRecoilState(selectedType);
  const [selectedQuestionState, setSelectedQuestionState] =
    useRecoilState(selectedQuestion);
  const [resumeIdState, setResumeIdState] = useRecoilState(resumeId);
  const [qCount, setQCount] = useRecoilState(questionCount);

  const [resumeList, setResumeList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // 선택된 옵션을 처리, 예를 들면 서버로 전송하거나 상태 업데이트
    console.log(
      "Selected option is:",
      selectedTypeState,
      selectedQuestionState,
      resumeIdState
    );
  };

  const handleTypeButton = (event) => {
    setSelectedTypeState(event.target.value);
  };

  const handleQuestionButton = (event) => {
    setSelectedQuestionState(event.target.value);
  };

  const handleResumeChange = (event) => {
    setResumeIdState(event.target.value);
  };

  useEffect(() => {
    setSelectedTypeState("/interview/mock");
    setSelectedQuestionState("자소서");
    setResumeIdState(0);
    setQCount(0);

    axios
      .get("/resume?page=0&size=10", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo5LFwidXNlckVtYWlsXCI6XCJva2lwMDQyOEBnbWFpbC5jb21cIixcInJvbGVcIjpcIlJPTEVfVVNFUlwiLFwidHlwZVwiOlwiQVRLXCJ9IiwiaWF0IjoxNjk5MzE5MzE3LCJleHAiOjE3MDA1Mjg5MTd9.lEnScHqHYfTPgwbLH_TAA8PViRf1aZtC-DTc67xHAwk",
        },
      })
      .then((response) => {
        console.log(response.data.content);
        setResumeList(response.data.content);
      });
  }, []);

  return (
    <div>
      <h1>면접 유형을 선택해주세요.</h1>
      <h3>유형</h3>
      <form onSubmit={handleSubmit}>
        <button value="/interview/self" onClick={handleTypeButton}>
          자율 연습
        </button>

        <button value="/interview/practice" onClick={handleTypeButton}>
          연습 면접
        </button>

        <button value="/interview/mock" onClick={handleTypeButton}>
          모의 면접
        </button>
        <br />
        <h3>질문</h3>
        <button value="자소서" onClick={handleQuestionButton}>
          자기소개서 기반 질문
        </button>

        <button value="기술" onClick={handleQuestionButton}>
          기술 질문
        </button>

        <button value="인성" onClick={handleQuestionButton}>
          인성 질문
        </button>
        <br />

        <h3>자소서</h3>
        <h4>자소서 기반 질문의 경우 필수로 선택해야 합니다.</h4>

        <select name="options" onChange={handleResumeChange}>
          <option value={0}>자소서 선택</option>
          {resumeList.map((item, index) => (
            <option key={index} value={item.resumeId}>
              {item.companyName}&nbsp;&nbsp;&nbsp;&nbsp;{item.interviewDate}
            </option>
          ))}
        </select>
        <br />
        <Link to={"/interview/preparation"}>
          <button type="button">다음</button>
        </Link>
      </form>
    </div>
  );
}

export default TypeSelect;

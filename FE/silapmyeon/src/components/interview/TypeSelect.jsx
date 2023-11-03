import { useState, useEffect } from "react";
import axios from "axios";

function TypeSelect() {
  const [selectedType, setSelectedType] = useState("모의");
  const [selectedQuestion, setSelectedQuestion] = useState("자소서");
  const [resumeList, setResumeList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // 선택된 옵션을 처리, 예를 들면 서버로 전송하거나 상태 업데이트
    console.log("Selected option is:", selectedType, selectedQuestion);
  };

  const handleTypeButton = (event) => {
    setSelectedType(event.target.value);
  };

  const handleQuestionButton = (event) => {
    setSelectedQuestion(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://k9b107a.p.ssafy.io/api/resume?page=0&size=10", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjoxMixcInVzZXJFbWFpbFwiOlwiemx6bF8zMjFAbmF2ZXIuY29tXCIsXCJyb2xlXCI6XCJST0xFX1VTRVJcIixcInR5cGVcIjpcIkFUS1wifSIsImlhdCI6MTY5ODk5MjY4NSwiZXhwIjoxNzAwMjAyMjg1fQ.snFSHtlVYIAXTrKgycSVhwzg6UpQKqolioHHmoyC_mA",
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
        <button value="자율" onClick={handleTypeButton}>
          자율 연습
        </button>

        <button value="연습" onClick={handleTypeButton}>
          연습 면접
        </button>

        <button value="모의" onClick={handleTypeButton}>
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

        <select name="options">
          <option value={0}>자소서 선택</option>
          {resumeList.map((item, index) => (
            <option key={index} value={item.resumeId}>
              {item.companyName}
            </option>
          ))}
        </select>
        <br />
        <button type="button">다음</button>
      </form>
    </div>
  );
}

export default TypeSelect;

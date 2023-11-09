import { useState } from "react";
import "./ResumeItemFormStyle.css";

function ResumeItemForm({
  idx,
  onQuestionChange,
  onAnswerChange,
  question,
  answer,
}) {
  const [resumeQuestion, setResumeQuestion] = useState(question);
  const [resumeAnswer, setResumeAnswer] = useState(answer);

  const handleQuestionChange = (event) => {
    const newQuestion = event.target.value;
    setResumeQuestion(newQuestion);
    onQuestionChange(idx, newQuestion); // Notify the parent component
  };

  const handleAnswerChange = (event) => {
    const newAnswer = event.target.value;
    setResumeAnswer(newAnswer);
    onAnswerChange(idx, newAnswer); // Notify the parent component
  };

  return (
    <div>
      <div>
        <div className="q">Q{idx + 1}</div>
        <input
          className="qInput"
          placeholder="자기소개서 질문을 입력하세요."
          onChange={handleQuestionChange}
          value={resumeQuestion}
        ></input>
      </div>
      <div>
        <div className="a">A{idx + 1}</div>
        <textarea
          className="aInput"
          placeholder="자기소개서 답변을 입력하세요."
          value={resumeAnswer}
          onChange={handleAnswerChange}
          style={{ resize: "none" }}
        ></textarea>
      </div>
    </div>
  );
}

export default ResumeItemForm;

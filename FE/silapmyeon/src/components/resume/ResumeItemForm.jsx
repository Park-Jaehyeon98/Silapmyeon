import "./ResumeItemFormStyle.css";

function ResumeItemForm({ idx }) {
  return (
    <div>
      <div>
        <div className="q">Q{idx + 1}</div>
        <input
          className="qInput"
          placeholder="자기소개서 질문을 입력하세요."
        ></input>
      </div>
      <div>
        <div className="a">A{idx + 1}</div>
        <textarea
          className="aInput"
          placeholder="자기소개서 답변을 입력하세요."
        ></textarea>
      </div>
    </div>
  );
}

export default ResumeItemForm;

import { useEffect, useState } from "react";
import ReviewModal from "../../components/review/ReviewModal";
import axios from "../../api/api";
import { useNavigate } from "react-router-dom";

function ReviewCreate() {
  const [modal, setModal] = useState(false);
  const [companyName, setCompanyName] = useState(null);
  const [interviewDate, setInterviewDate] = useState(null);
  const [resumeId, setResumeId] = useState(0);
  const loadResume = () => {
    setModal(true);
  };

  useEffect(() => {
    if (interviewDate != null) {
      setYear(interviewDate.substring(0, 4));
      setQuarter(calculateQuarter(interviewDate));
    } else {
      setYear(null);
      setQuarter(null);
    }
  }, [interviewDate]);

  const [year, setYear] = useState(null);
  const [quarter, setQuarter] = useState(null);

  const calculateQuarter = (date) => {
    const month = Number(date.substring(5, 7));
    if (month <= 3) {
      return "1분기";
    } else if (month <= 6) {
      return "2분기";
    } else if (month <= 9) {
      return "3분기";
    } else {
      return "4분기";
    }
  };

  const handleModalChange = (
    flag,
    newCompanyName,
    newInterviewDate,
    newResumeId
  ) => {
    setInterviewDate(newInterviewDate);

    setCompanyName(newCompanyName);
    setModal(flag);
    setResumeId(newResumeId);

    console.log(modal);
    console.log(companyName);
    console.log(interviewDate);
    console.log(resumeId);
  };

  const [employmentType, setEmploymentType] = useState("");
  const [reviewOrder, setReviewOrder] = useState("");
  const [reviewJob, setReviewJob] = useState("");
  const [reviewQuestion, setReviewQuestion] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  const employmentTypeChange = (event) => {
    setEmploymentType(event.target.value);
    console.log(employmentType);
  };

  const reviewOrderChange = (event) => {
    setReviewOrder(event.target.value);
    console.log(reviewOrder);
  };

  const reviewJobChange = (event) => {
    setReviewJob(event.target.value);
    console.log(reviewJob);
  };

  const reviewQuestionChange = (event) => {
    setReviewQuestion(event.target.value);
    console.log(reviewQuestion);
  };

  const reviewContentChange = (event) => {
    setReviewContent(event.target.value);
    console.log(reviewContent);
  };

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

  const navigate = useNavigate();

  const registerReview = async () => {
    let flag = true;
    if (
      isEmpty(employmentType) ||
      isEmpty(reviewOrder) ||
      isEmpty(reviewJob) ||
      isEmpty(reviewQuestion) ||
      isEmpty(reviewContent) ||
      isEmpty(resumeId)
    ) {
      flag = false;
      alert("항목을 모두 입력하세요.");
    }

    if (flag) {
      const res = await axios.post("/review", {
        employmentType,
        reviewOrder,
        reviewJob,
        reviewQuestion,
        reviewContent,
        resumeId,
      });
      console.log(res);
      navigate(`/review`);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div>면접 후기 등록</div>
      {modal === true ? (
        <ReviewModal onModalChange={handleModalChange} /> //기업명, 면접 날짜 반환
      ) : null}
      <button onClick={loadResume}>자기소개서 불러오기</button>
      <div>
        기업명: <input value={companyName} readOnly />
      </div>
      <div>
        년도: <input value={year} readOnly />
      </div>
      <div>
        분기: <input value={quarter} readOnly />
      </div>
      <div>
        채용형태:{" "}
        <input value={employmentType} onChange={employmentTypeChange} />
      </div>
      <div>
        차수: <input value={reviewOrder} onChange={reviewOrderChange} />
      </div>
      <div>
        직무: <input value={reviewJob} onChange={reviewJobChange} />
      </div>
      <div>가장 기억에 남는 질문 한 가지를 남겨주세요.</div>
      <input value={reviewQuestion} onChange={reviewQuestionChange} />
      <div>자유롭게 면접 후기를 남겨주세요.</div>
      <textarea
        value={reviewContent}
        style={{ resize: "none" }}
        onChange={reviewContentChange}
      />
      <button onClick={registerReview}>완료</button>
    </div>
  );
}

export default ReviewCreate;

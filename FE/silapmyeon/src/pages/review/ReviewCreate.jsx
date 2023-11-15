import { useEffect, useState } from "react";
import ReviewModal from "../../components/review/ReviewModal";
import { axiosAuth } from "../../api/settingAxios";
import { useNavigate } from "react-router-dom";
import e from "cors";
import styles from "./ReviewCreateStyle.module.css";

function ReviewCreate() {
  const [modal, setModal] = useState(false);
  const [companyName, setCompanyName] = useState(null);
  const [interviewDate, setInterviewDate] = useState(null);
  const [resumeId, setResumeId] = useState(0);
  const loadResume = () => {
    setModal(true);
  };

  useEffect(() => {}, [resumeId]);

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
    if (newResumeId != null) {
      setInterviewDate(newInterviewDate);
      setCompanyName(newCompanyName);
      setResumeId(newResumeId);
    }

    setModal(flag);

    // console.log(modal);
    // console.log(companyName);
    // console.log(interviewDate);
    // console.log(resumeId);
  };

  const [employmentType, setEmploymentType] = useState("");
  const [reviewOrder, setReviewOrder] = useState("");
  const [reviewJob, setReviewJob] = useState("");
  const [reviewQuestion, setReviewQuestion] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  const employmentTypeChange = (event) => {
    if (event.target.value.length > 3) {
      alert("3글자 이내로 입력하세요.");
    } else {
      setEmploymentType(event.target.value);
      // console.log(employmentType);
    }
  };

  const reviewOrderChange = (event) => {
    if (event.target.value.length > 5) {
      alert("5글자 이내로 입력하세요.");
    } else {
      setReviewOrder(event.target.value);
      // console.log(reviewOrder);
    }
  };

  const reviewJobChange = (event) => {
    if (event.target.length > 10) {
      alert("10글자 이내로 입력하세요.");
    } else {
      setReviewJob(event.target.value);
      // console.log(reviewJob);
    }
  };

  const reviewQuestionChange = (event) => {
    if (event.target.value > 50) {
      alert("50글자 이내로 입력하세요.");
    } else {
      setReviewQuestion(event.target.value);
      // console.log(reviewQuestion);
    }
  };

  const reviewContentChange = (event) => {
    if (event.target.value > 2000) {
      alert("2000글자 이내로 작성하세요.");
    } else {
      setReviewContent(event.target.value);
      // console.log(reviewContent);
    }
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
      resumeId === 0
    ) {
      flag = false;
      alert("항목을 모두 입력하세요.");
    }

    if (flag) {
      const res = await axiosAuth.post("/review", {
        employmentType,
        reviewOrder,
        reviewJob,
        reviewQuestion,
        reviewContent,
        resumeId,
      });
      // console.log(res);
      navigate(`/review`);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="head">면접 후기 등록</div>
      {modal === true ? (
        <ReviewModal onModalChange={handleModalChange} /> //기업명, 면접 날짜 반환
      ) : null}
      <div className={styles.box}>
        <div className={styles.row1}>
          <span className={styles.companyNameText}>기업명 </span>{" "}
          <input
            value={companyName}
            readOnly
            className={styles.companyNameInput}
          />
          <button className={styles.loadResumeButton} onClick={loadResume}>
            자소서 목록
          </button>
        </div>

        <div className={styles.row2}>
          <input
            placeholder="연도"
            value={interviewDate != null ? interviewDate.substring(0, 4) : ""}
            readOnly
            className={styles.yearBox}
          />

          <input
            placeholder="분기"
            className={styles.quarterBox}
            value={interviewDate != null ? calculateQuarter(interviewDate) : ""}
            readOnly
          />
          <input
            placeholder="채용형태"
            className={styles.etBox}
            value={employmentType}
            onChange={employmentTypeChange}
          />
          <input
            placeholder="차수"
            className={styles.roBox}
            value={reviewOrder}
            onChange={reviewOrderChange}
          />
          <input
            placeholder="직무"
            className={styles.rjBox}
            value={reviewJob}
            onChange={reviewJobChange}
          />
        </div>
        <div className={styles.row3}>
          <div className={styles.qTitleText}>
            가장 기억에 남는 질문 한 가지를 남겨주세요.
          </div>
          <input
            className={styles.qInputBox}
            value={reviewQuestion}
            onChange={reviewQuestionChange}
          />
        </div>
        <div className={styles.row4}>
          <div className={styles.aTitleText}>
            자유롭게 면접 후기를 남겨주세요.
          </div>
          <textarea
            className={styles.aInputBox}
            value={reviewContent}
            style={{ resize: "none" }}
            onChange={reviewContentChange}
          />
        </div>
        <button className={styles.completeButton} onClick={registerReview}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ReviewCreate;

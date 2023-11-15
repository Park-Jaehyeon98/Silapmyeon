import { useState } from "react";
import { axiosAuth } from "../../api/settingAxios";
import { useLocation } from "react-router-dom";
import styles from "./ReviewModifyStyle.module.css";

function ReviewModify() {
  const location = useLocation();
  const { review } = location.state;
  const [employmentType, setEmploymentType] = useState(review.employmentType);
  const [reviewOrder, setReviewOrder] = useState(review.reviewOrder);
  const [reviewJob, setReviewJob] = useState(review.reviewJob);
  const [reviewQuestion, setReviewQuestion] = useState(review.reviewQuestion);
  const [reviewContent, setReviewContent] = useState(review.reviewContent);

  const handleEmploymentType = (event) => {
    if (event.target.value.length > 3) {
      alert("3글자 이내로 입력하세요.");
    } else {
      setEmploymentType(event.target.value);
      // console.log(employmentType);
    }
  };

  const handleReviewOrder = (event) => {
    if (event.target.value.length > 5) {
      alert("5글자 이내로 입력하세요.");
    } else {
      setReviewOrder(event.target.value);
      // console.log(reviewOrder);
    }
  };

  const handleReviewJob = (event) => {
    if (event.target.length > 10) {
      alert("10글자 이내로 입력하세요.");
    } else {
      setReviewJob(event.target.value);
      // console.log(reviewJob);
    }
  };
  const handleReviewQuestion = (event) => {
    if (event.target.value > 50) {
      alert("50글자 이내로 입력하세요.");
    } else {
      setReviewQuestion(event.target.value);
      // console.log(reviewQuestion);
    }
  };
  const handleReviewContent = (event) => {
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

  const modifyReview = () => {
    let flag = true;

    if (
      isEmpty(employmentType) ||
      isEmpty(reviewOrder) ||
      isEmpty(reviewJob) ||
      isEmpty(reviewQuestion) ||
      isEmpty(reviewContent)
    ) {
      flag = false;
      alert("항목을 모두 입력하세요.");
    }

    if (flag) {
      const resp = axiosAuth.put(`/review/${review.reviewId}`, {
        employmentType,
        reviewOrder,
        reviewJob,
        reviewQuestion,
        reviewContent,
      });
      // console.log(resp);
      window.location.href = `/review/${review.reviewId}`;
    }
  };
  return (
    <div style={{ height: "100vh" }}>
      <div className={styles.title}>면접 후기 수정</div>
      <div className={styles.box}>
        <div className={styles.row1}>
          <span className={styles.companyNameText}>기업명 </span>
          <input
            className={styles.companyNameInput}
            value={review.companyName}
            readOnly
          />
        </div>
        <div className={styles.row2}>
          <input
            placeholder="연도"
            className={styles.yearBox}
            value={review.interviewDate.substring(0, 4)}
            readOnly
          />

          <input
            placeholder="분기"
            className={styles.quarterBox}
            value={calculateQuarter(review.interviewDate)}
            readOnly
          />

          <input
            placeholder="채용형태"
            className={styles.etBox}
            value={employmentType}
            onChange={handleEmploymentType}
          />

          <input
            placeholder="차수"
            className={styles.roBox}
            value={reviewOrder}
            onChange={handleReviewOrder}
          />

          <input
            placeholder="직무"
            className={styles.rjBox}
            value={reviewJob}
            onChange={handleReviewJob}
          />
        </div>
        <div className={styles.row3}>
          <div className={styles.qTitleText}>
            가장 기억에 남는 질문 한 가지를 남겨주세요.
          </div>
          <input
            className={styles.qInputBox}
            value={reviewQuestion}
            onChange={handleReviewQuestion}
          />
        </div>
        <div className={styles.row4}>
          <div className={styles.aTitleText}>
            자유롭게 면접 후기를 남겨주세요.
          </div>
          <textarea
            className={styles.aInputBox}
            value={reviewContent}
            onChange={handleReviewContent}
            style={{ resize: "none" }}
          />
        </div>
        <button className={styles.completeButton} onClick={modifyReview}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ReviewModify;

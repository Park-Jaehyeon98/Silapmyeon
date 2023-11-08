import { useState } from "react";
import axios from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";

function ReviewModify() {
  const location = useLocation();
  const { review } = location.state;
  const [reviewCompanyName, setReviewCompanyName] = useState(
    review.reviewCompanyName
  );
  const [reviewYear, setReviewYear] = useState(review.reviewYear);
  const [reviewQuarter, setReviewQuarter] = useState(review.reviewQuarter);
  const [employmentType, setEmploymentType] = useState(review.employmentType);
  const [reviewOrder, setReviewOrder] = useState(review.reviewOrder);
  const [reviewJob, setReviewJob] = useState(review.reviewJob);
  const [reviewQuestion, setReviewQuestion] = useState(review.reviewQuestion);
  const [reviewContent, setReviewContent] = useState(review.reviewContent);

  const handleEmploymentType = (event) => {
    setEmploymentType(event.target.value);
    console.log(employmentType);
  };

  const handleReviewOrder = (event) => {
    setReviewOrder(event.target.value);
    console.log(reviewOrder);
  };

  const handleReviewJob = (event) => {
    setReviewJob(event.target.value);
    console.log(reviewJob);
  };
  const handleReviewQuestion = (event) => {
    setReviewQuestion(event.target.value);
    console.log(reviewQuestion);
  };
  const handleReviewContent = (event) => {
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
      const resp = axios.put(`/review/${review.reviewId}`, {
        employmentType,
        reviewOrder,
        reviewJob,
        reviewQuestion,
        reviewContent,
      });
      console.log(resp);
      navigate(`/review/${review.reviewId}`);
    }
  };
  return (
    <div style={{ height: "100vh" }}>
      <div>
        <div>면접 후기 수정</div>
        <input value={reviewCompanyName} readOnly />
        <input value={reviewYear} readOnly />
        <input value={reviewQuarter} readOnly />
        <input value={employmentType} onChange={handleEmploymentType} />
        <input value={reviewOrder} onChange={handleReviewOrder} />
        <input value={reviewJob} onChange={handleReviewJob} />
        <div>가장 기억에 남는 질문 한 가지를 남겨주세요.</div>
        <input value={reviewQuestion} onChange={handleReviewQuestion} />
        <div>자유롭게 면접 후기를 남겨주세요.</div>
        <textarea
          value={reviewContent}
          onChange={handleReviewContent}
          style={{ resize: "none" }}
        />
        <button onClick={modifyReview}>완료</button>
      </div>
    </div>
  );
}

export default ReviewModify;

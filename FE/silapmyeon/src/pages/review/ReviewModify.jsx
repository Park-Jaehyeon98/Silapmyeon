import { useState } from "react";
import { axiosAuth } from "../../api/settingAxios";
import { useLocation, useNavigate } from "react-router-dom";

function ReviewModify() {
  const location = useLocation();
  const { review } = location.state;
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
      console.log(resp);
      window.location.href = `/review/${review.reviewId}`;
    }
  };
  return (
    <div style={{ height: "100vh" }}>
      <div>
        <div>면접 후기 수정</div>
        <div>
          기업명: <input value={review.companyName} readOnly />
        </div>
        <div>
          년도: <input value={review.interviewDate.substring(0, 4)} readOnly />
        </div>
        <div>
          분기:{" "}
          <input value={calculateQuarter(review.interviewDate)} readOnly />
        </div>
        <div>
          채용형태:{" "}
          <input value={employmentType} onChange={handleEmploymentType} />
        </div>
        <div>
          차수: <input value={reviewOrder} onChange={handleReviewOrder} />
        </div>
        <div>
          직무: <input value={reviewJob} onChange={handleReviewJob} />
        </div>
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

import { useEffect, useState } from "react";
import { axiosAuth } from "../../api/settingAxios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ReviewDetailStyle.module.css";

function ReviewDetail() {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);

  const getReview = async () => {
    const resp = await axiosAuth.get(`review/${reviewId}`);
    console.log(resp.data);
    setReview(resp.data);
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

  useEffect(() => {
    getReview();
  }, []);

  const navigate = useNavigate();

  const navigateToModify = () => {
    navigate("modify", {
      state: { review },
    });
  };

  const removeReview = async () => {
    if (window.confirm("면접후기를 삭제하시겠습니까?")) {
      const res = await axiosAuth.delete(`/review/${reviewId}`);
      console.log(res);
      navigate("/review");
    }
  };

  const navigateToList = () => {
    navigate("/review");
  };

  return (
    <div style={{ height: "100vh" }}>
      {review ? (
        <div>
          <div className={styles.title}>{review.companyName} 면접 후기</div>
          <div className={styles.detail}>
            {review.interviewDate.substring(0, 4)}년 |{" "}
            {calculateQuarter(review.interviewDate)} | {review.employmentType} |{" "}
            {review.reviewJob} | {review.reviewOrder}
          </div>
          <div className={styles.q}>"{review.reviewQuestion}"</div>
          <div className={styles.a}>{review.reviewContent}</div>
          <button className={styles.modifyButton} onClick={navigateToModify}>
            수정
          </button>
          <button className={styles.deleteButton} onClick={removeReview}>
            삭제
          </button>
          <button className={styles.list} onClick={navigateToList}>
            목록
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ReviewDetail;

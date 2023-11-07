import { useEffect, useState } from "react";
import axios from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";

function ReviewDetail() {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);

  const getReview = async () => {
    const resp = await axios.get(`review/${reviewId}`);
    console.log(resp.data);
    setReview(resp.data);
  };

  useEffect(() => {
    getReview();
  }, []);

  const navigate = useNavigate();

  const navigateToModify = () => {
    navigate("modify", { state: { review } });
  };

  const removeReview = async () => {
    if (window.confirm("면접후기를 삭제하시겠습니까?")) {
      const res = await axios.delete(`/review/${reviewId}`);
      console.log(res);
      navigate("/review");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      {review ? (
        <div>
          <div>{review.reviewCompanyName} 면접 후기</div>
          <div>{review.reviewYear}</div>
          <div>{review.reviewQuarter}</div>
          <div>{review.employmentType}</div>
          <div>{review.reviewJob}</div>
          <div>{review.reviewOrder}</div>
          <div>{review.reviewQuestion}</div>
          <div>{review.reviewContent}</div>
          <button onClick={navigateToModify}>수정</button>
          <button onClick={removeReview}>삭제</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ReviewDetail;

import { Link } from "react-router-dom";
import axios from "../../api/api";
import { useEffect, useState } from "react";

function ReviewList() {
  const [currentPage, setCurrentPage] = useState(0);
  const getReviews = async (page) => {
    const resp = await axios.get(`/review?page=${page}`);
    console.log(resp);
    setReviews(resp.data.content);
  };

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews(currentPage);
  }, [currentPage]);

  return (
    <div style={{ height: "100vh" }}>
      <div>면접 후기</div>
      <Link to={"/review/create"}>
        <button>+</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>기업명</th>
            <th>년도</th>
            <th>분기</th>
            <th>경력</th>
            <th>단계</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, idx) => {
            return (
              <tr>
                <td>{idx + 1}</td>
                <Link
                  to={`${review.reviewId}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <td>{review.reviewCompanyName}</td>
                </Link>
                <td>{review.reviewYear}</td>
                <td>{review.reviewQuarter}</td>
                <td>{review.employmentType}</td>
                <td>{review.reviewOrder}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewList;

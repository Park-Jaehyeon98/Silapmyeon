import { Link } from "react-router-dom";
import { axiosAuth } from "../../api/settingAxios";
import { useEffect, useState } from "react";

function ReviewList() {
  const [currentPage, setCurrentPage] = useState(0);
  const getReviews = async (page) => {
    const resp = await axiosAuth.get(`/review?page=${page}`);
    console.log(resp);
    setReviews(resp.data.content);
  };

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews(currentPage);
  }, [currentPage]);

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
                  <td>{review.companyName}</td>
                </Link>
                <td>{review.interviewDate.substring(0, 4)}</td>
                <td>{calculateQuarter(review.interviewDate)}</td>
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

import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import leftArrow from "../../assets/left-arrow.png";
import pin from "../../assets/pin.png";

const InterviewCarousel = ({ interviews }) => {
  const [index, setIndex] = useState(0);

  if (!interviews) {
    return <div>Loading...</div>; // 또는 다른 적절한 대체 UI
  }

  // console.log("length : " + interviews.length);
  // console.log(interviews);

  const nextInterview = () => {
    if (index + 5 < interviews.length) {
      // 수정: 마지막 5개 아이템에 도달하면 더 이상 증가시키지 않음
      setIndex(index + 5);
    }
    // console.log("현재 index : " + index);
  };

  const prevInterview = () => {
    if (index - 5 >= 0) {
      // 수정: 마지막 5개 아이템에 도달하면 더 이상 증가시키지 않음
      setIndex(index - 5);
    }

    // console.log("현재 index : " + index);
  };

  const formatDate = (date) => {
    const today = new Date();
    const diff = date - today; // 밀리초 단위의 차이
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `D-${diffDays}`;
  };

  const transformStyle = {
    display: `flex`,
    flexWrap: `nowrap`,
    transition: `transform 1.0s ease`,
    transform: `translateX(-${index * 9.1}%)`, // 수정된 부분
  };

  return (
    <div className={styles.carousel}>
      <img
        src={leftArrow}
        alt="clip"
        className={styles.arrow}
        onClick={prevInterview}
      />
      <div className={styles.carouselBox}>
        <div style={transformStyle}>
          {interviews.map((interview, i) => (
            <div key={i} className={styles.interviewItem}>
              <img src={pin} alt="pin" className={styles.pin} />
              <div className={styles.interviewItemChild}>
                {formatDate(interview.date)}
              </div>
              <div className={styles.interviewItemChild}>
                {interview.company}
              </div>
            </div>
          ))}
        </div>
      </div>
      <img
        src={leftArrow}
        alt="clip"
        className={styles.arrow}
        onClick={nextInterview}
      />
    </div>
  );
};

export default InterviewCarousel;

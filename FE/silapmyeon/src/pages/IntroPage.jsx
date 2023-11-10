import React, { useState } from "react";
import InterviewImg from "../assets/intro_1.png";
import styles from "./IntroPage.module.css";
import LoginModal from "../components/modal/LoginModal";

const IntroPage = () => {
  const startBtn = () => {
    // 로그인 모달
    setOpen(true);
  };

  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.intropage}>
      {isOpen && (
        <LoginModal
          open={isOpen}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
      <div>
        <div className={styles.container}>
          <img src={InterviewImg} className={styles.interview}></img>
          <p className={styles.content1}>
            면접 합격은
            <br />
            실전압축면접
            <br />
            <button className={styles.startBtn} onClick={startBtn}>
              바로 시작하기
            </button>
          </p>
        </div>
        <div className={styles.introBox}>
          <div className={styles.content} style={{ textAlign: "right" }}>
            자소서를 등록하여
            <br /> 모의면접을 시작해보세요
          </div>
          <div className={styles.introImg} style={{ marginLeft: "auto" }}></div>
        </div>
        <div className={styles.introBox}>
          <div className={styles.introImg}></div>
          <div className={styles.content} style={{ marginLeft: "auto" }}>
            ChatGPT가 개인 맞춤으로 생성한
            <br /> 질문에 답해보세요
          </div>
        </div>
        <div className={styles.introBox}>
          <div className={styles.content} style={{ textAlign: "right" }}>
            면접 종료 후 리포트를 참고하여
            <br /> 합격을 향해, 함께 나아가요
          </div>
          <div className={styles.introImg} style={{ marginLeft: "auto" }}></div>
        </div>

        <div className={styles.msg}>
          합격을 위한 면접 연습, 실전압축면접이 함께합니다{" "}
        </div>
      </div>
    </div>
  );
};

export default IntroPage;

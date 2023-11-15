import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import Webcam from "react-webcam";
import AltCam from "./cam.png";
import { camState } from "../../atoms/atoms";
import AudioRecord from "./AudioRecord";
import { Link } from "react-router-dom";
import styles from "./Self.module.css";

function Self() {
  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user",
  };

  const webcamRef = useRef(null);
  const [useCam, setUseCam] = useRecoilState(camState);

  const [timer, setTimer] = useState(0);
  const [hide, setHide] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes} : ${remainingSeconds}`;
  };

  function handleTimeData(time) {
    setTimer(time);
  }

  function handleHideButton() {
    setHide((prev) => !prev);
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.timerLabel}> TIMER </div>
        <div className={styles.timerContainer}>{formatTime(timer)}</div>
      </div>
      {useCam ? (
        <div className={styles.webcamContainer}>
          <Webcam
            audio={false}
            height={360}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
            videoConstraints={videoConstraints}
            mirrored={true}
          ></Webcam>
        </div>
      ) : (
        <div className={styles.webcamImage}>
          <img width={640} height={360} src={AltCam} alt="cam" />
        </div>
      )}

      <input
        type="text"
        placeholder="연습 문항 질문을 입력하세요."
        className={styles.inputText}
      />
      <br />
      <br />
      {!hide && (
        <textarea
          placeholder="연습 문항 답변을 입력하세요."
          className={styles.textArea}
        />
      )}
      <button onClick={handleHideButton} className={styles.button}>
        숨기기
      </button>
      <AudioRecord onData={handleTimeData} />
      <Link to={"/home"}>
        <button className={styles.button}>종료</button>
      </Link>
    </div>
  );
}

export default Self;

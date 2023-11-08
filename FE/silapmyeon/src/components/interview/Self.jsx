import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import Webcam from "react-webcam";
import AltCam from "./cam.png";
import { camState } from "../../atoms/atoms";
import AudioRecord from "./AudioRecord";
import { Link } from "react-router-dom";

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
    return `${minutes}:${remainingSeconds}`;
  };

  function handleTimeData(time) {
    setTimer(time);
  }

  function handleHideButton() {
    setHide((prev) => !prev);
  }

  return (
    <div>
      {useCam ? (
        <Webcam
          audio={false}
          height={360}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          videoConstraints={videoConstraints}
          mirrored={true}
        ></Webcam>
      ) : (
        <img width={640} height={360} src={AltCam} alt="cam" />
      )}
      <p>타이머: {formatTime(timer)}</p>
      <input type="text" />
      <br />
      <br />
      {!hide && (
        <textarea
          style={{
            width: "300px",
            height: "200px",
            resize: "none",
          }}
        />
      )}
      <button onClick={handleHideButton}>숨기기</button>
      <AudioRecord onData={handleTimeData} />
      <Link to={"/"}>
        <button>종료</button>
      </Link>
    </div>
  );
}

export default Self;

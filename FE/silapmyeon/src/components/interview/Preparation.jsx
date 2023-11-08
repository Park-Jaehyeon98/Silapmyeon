import { useRef } from "react";
import { useRecoilState } from "recoil";
import Webcam from "react-webcam";
import AltCam from "./cam.png";
import { camState } from "../../atoms/atoms";

function Preparation() {
  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user",
  };

  const webcamRef = useRef(null);
  const [useCam, setUseCam] = useRecoilState(camState);

  const handleCam = () => {
    setUseCam((prev) => !prev);
  };

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
        ></Webcam>
      ) : (
        <img width={640} height={360} src={AltCam} alt="cam" />
      )}
      <button onClick={handleCam}>{useCam ? "Off" : "On"}</button>
      <audio></audio>
      <br />
      <button>다음</button>
      <button>나가기</button>
    </div>
  );
}

export default Preparation;

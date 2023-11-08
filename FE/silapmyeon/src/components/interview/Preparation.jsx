import { useRef } from "react";
import { useRecoilState } from "recoil";
import Webcam from "react-webcam";
import AltCam from "./cam.png";
import { camState, selectedType } from "../../atoms/atoms";
import { Link } from "react-router-dom";

function Preparation() {
  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user",
  };

  const webcamRef = useRef(null);
  const [useCam, setUseCam] = useRecoilState(camState);
  const [selectedTypeState, setSelectedTypeState] =
    useRecoilState(selectedType);

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
          mirrored={true}
        ></Webcam>
      ) : (
        <img width={640} height={360} src={AltCam} alt="cam" />
      )}
      <button onClick={handleCam}>{useCam ? "Off" : "On"}</button>
      <audio></audio>
      <br />
      <Link to={selectedTypeState}>
        <button>다음</button>
      </Link>
      <Link to={"/"}>
        <button>나가기</button>
      </Link>
    </div>
  );
}

export default Preparation;

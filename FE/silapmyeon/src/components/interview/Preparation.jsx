import { useRef } from "react";
import { useRecoilState } from "recoil";
import Webcam from "react-webcam";
import AltCam from "./cam.png";
import { camState, selectedType } from "../../atoms/atoms";
import { Link } from "react-router-dom";
import styles from "./Preparation.module.css";
import Visualizer from "./Visualizer";

function Preparation() {
  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user",
  };

  const webcamRef = useRef(null);
  const [useCam, setUseCam] = useRecoilState(camState);
  const [selectedTypeState, setSelectedTypeState] = useRecoilState(selectedType);

  const handleCam = () => {
    setUseCam((prev) => !prev);
  };

  return (
    <div className={styles.container}>
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
      <button className={styles.button} onClick={handleCam}>
        {useCam ? "Off" : "On"}
      </button>
      <Visualizer />
      <br />
      <div className={styles.buttoncontainer}>
        <Link to={selectedTypeState}>
          <button className={styles.button}>다음</button>
        </Link>
        <Link to={"/"}>
          <button className={styles.button}>나가기</button>
        </Link>
      </div>
    </div>
  );
}

export default Preparation;

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import AltCam from "./cam.png";

function Preparation() {
  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user",
  };

  const webcamRef = useRef(null);
  const [useCam, setUseCam] = useState(true);

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
        <img width={640} height={360} src={AltCam} />
      )}
      <button onClick={handleCam}>On/Off</button>
    </div>
  );
}

export default Preparation;

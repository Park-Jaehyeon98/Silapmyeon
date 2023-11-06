import { useState, useRef } from "react";
import Webcam from "react-webcam";
import AltCam from "./cam.png";
import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";

function Practice() {
  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user",
  };

  const webcamRef = useRef(null);
  const [useCam, setUseCam] = useState(true);

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {});

  return (
    <div>
      <h1>연습</h1>
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
      <SpeechToText />
      <TextToSpeech />
    </div>
  );
}

export default Practice;

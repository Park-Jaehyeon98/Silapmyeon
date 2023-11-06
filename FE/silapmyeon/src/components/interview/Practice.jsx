import { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Webcam from "react-webcam";
import AltCam from "./cam.png";
import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";
import { camState, questionCount } from "../../atoms/atoms";

function Practice() {
  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user",
  };

  const webcamRef = useRef(null);

  const [useCam, setUseCam] = useRecoilState(camState);
  const [qCount, setQCount] = useRecoilState(questionCount);

  const [question, setQuestion] = useState();

  const [isLoading, setIsLoading] = useState(true);

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {});

  function handleNextButton() {
    setQCount((prev) => prev + 1);
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/interview/" + "1").then((response) => {
      console.log(response.data.question);
      setQuestion(response.data.question);
      setIsLoading((prev) => !prev);
    });
  }, []);

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
        <img width={640} height={360} src={AltCam} alt="cam" />
      )}
      <div>
        <h3>질문 횟수</h3>
        <h2>{qCount}</h2>
      </div>
      {qCount !== 0 ? <SpeechToText /> : null}
      {qCount !== 0 ? <TextToSpeech question={question[qCount]} /> : null}
      <button>다시하기</button>
      {qCount === 5 ? (
        <button>종료</button>
      ) : (
        <button onClick={handleNextButton} disabled={isLoading ? true : false}>
          {qCount !== 0 ? "다음" : "시작"}
        </button>
      )}
    </div>
  );
}

export default Practice;

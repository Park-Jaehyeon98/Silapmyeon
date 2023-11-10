import { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "../../api/api";
import AltCam from "./cam.png";
import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";
import {
  questionCount,
  tts,
  stt,
  completeSpeech,
  selectedType,
  selectedQuestion,
  resumeId,
} from "../../atoms/atoms";
import { Link } from "react-router-dom";
import styles from "./Mock.module.css";
import Eyetracking from "./EyeTracking";

function Mock() {
  const [qCount, setQCount] = useRecoilState(questionCount);
  const [ttsState, setTtsState] = useRecoilState(tts);
  const [sttState, setSttState] = useRecoilState(stt);
  const [completeSpeechState, setCompleteSpeechState] = useRecoilState(completeSpeech);
  const [selectedTypeState, setSelectedTypeState] = useRecoilState(selectedType);
  const [selectedQuestionState, setSelectedQuestionState] = useRecoilState(selectedQuestion);
  const [resumeIdState, setResumeIdState] = useRecoilState(resumeId);

  const [question, setQuestion] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);

  function handleNextButton() {
    setQCount((prev) => prev + 1);
    setTtsState(true);
    setSttState(true);
    setCompleteSpeechState(false);
  }

  function handleSTTData(time) {
    setTimer(time);
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const body = {
      type: selectedTypeState,
      question: selectedQuestionState,
      resume: resumeIdState,
    };

    axios.post("/interview", body).then((response) => {
      console.log(response.data.question);
      setQuestion(response.data.question);
      setIsLoading((prev) => !prev);
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.timerLabel}> TIMER </div>
        <div className={styles.timerContainer}>{formatTime(timer)}</div>
      </div>
      <div>
        <img className={styles.webcamImage} width={640} height={360} src={AltCam} alt="cam" />
      </div>
      <div style={{ display: "none" }}>
        {qCount !== 0 ? <TextToSpeech question={question[qCount]} /> : null}
        {qCount !== 0 ? <SpeechToText onData={handleSTTData} /> : null}
      </div>
      {qCount === 5 ? (
        <Link to={"/"}>
          <button className={styles.button} disabled={isLoading || ttsState}>
            종료
          </button>
        </Link>
      ) : (
        <button
          onClick={handleNextButton}
          className={styles.button}
          disabled={isLoading || ttsState}
        >
          {qCount !== 0 ? "다음" : "시작"}
        </button>
      )}
      <Eyetracking />
    </div>
  );
}

export default Mock;

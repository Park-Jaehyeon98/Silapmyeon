import { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { axiosAuth } from "../../api/settingAxios";
import Webcam from "react-webcam";
import AltCam from "./cam.png";
import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";
import styles from "./Practice.module.css";
import {
  camState,
  questionCount,
  tts,
  stt,
  completeSpeech,
  selectedType,
  selectedQuestion,
  resumeId,
} from "../../atoms/atoms";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function Practice() {
  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user",
  };

  const webcamRef = useRef(null);

  const [useCam, setUseCam] = useRecoilState(camState);
  const [qCount, setQCount] = useRecoilState(questionCount);
  const [ttsState, setTtsState] = useRecoilState(tts);
  const [sttState, setSttState] = useRecoilState(stt);
  const [completeSpeechState, setCompleteSpeechState] =
    useRecoilState(completeSpeech);
  const [selectedTypeState, setSelectedTypeState] =
    useRecoilState(selectedType);
  const [selectedQuestionState, setSelectedQuestionState] =
    useRecoilState(selectedQuestion);
  const [resumeIdState, setResumeIdState] = useRecoilState(resumeId);

  const [question, setQuestion] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  function handleNextButton() {
    setQCount((prev) => prev + 1);
    setTtsState(true);
    setSttState(true);
    setCompleteSpeechState(false);
  }

  function handleReplay() {
    setTtsState(true);
    setSttState(true);
    setCompleteSpeechState(false);
  }

  function handleSTTData(time) {
    setTimer(time);
  }

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

    axiosAuth.post("/interview", body).then((response) => {
      console.log(response.data.question);
      setQuestion(response.data.question);
      setIsLoading((prev) => !prev);
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      webcamRef.current = null;
      setQCount(0);
      setTtsState(false);
      setSttState(false);
      setCompleteSpeechState(false);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.timerLabel}> TIMER </div>
        <div className={styles.timerContainer}>{formatTime(timer)}</div>
      </div>
      <div className={styles.webcamContainer}>
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
      </div>
      <div className={styles.questionCountContainer}>
        <div className={styles.questionCountTitle}>질문 횟수</div>
        <div className={styles.questionCount}>{qCount}</div>
      </div>
      {qCount !== 0 ? <TextToSpeech question={question[qCount]} /> : null}
      {qCount !== 0 ? <SpeechToText onData={handleSTTData} /> : null}
      <div>
        <button
          className={styles.button}
          onClick={handleReplay}
          disabled={isLoading || ttsState}
        >
          다시하기
        </button>
        {qCount >= 5 ? (
          <Link to={"/home"}>
            <button className={styles.button} disabled={isLoading || ttsState}>
              종료
            </button>
          </Link>
        ) : (
          <button
            className={styles.button}
            onClick={handleNextButton}
            disabled={isLoading || ttsState}
          >
            {qCount !== 0 ? "다음" : "시작"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Practice;

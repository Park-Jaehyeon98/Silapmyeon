import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  answer,
} from "../../atoms/atoms";
import styles from "./Mock.module.css";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../Recoil/UserAtom";
import Webcam from "react-webcam";

function Mock() {
  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user",
  };

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
  const [answerText, setAnswerText] = useRecoilState(answer);

  const [question, setQuestion] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [interviewData, setInterviewData] = useState([]);
  const [videoData, setVideoData] = useState([]);

  const userValue = useRecoilValue(UserAtom);

  const navigate = useNavigate();

  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const formData = new FormData();

  function handleNextButton() {
    if (qCount !== 0) {
      setInterviewData((prev) => {
        return [
          ...prev,
          {
            question: question[qCount],
            answer: answerText,
            key: qCount.toString(),
          },
        ];
      });

      if (recording) {
        handleStopCaptureClick();
      }
    }

    setQCount((prev) => prev + 1);
    setTtsState(true);
    setSttState(true);
    setCompleteSpeechState(false);
  }

  function handleEndButton() {
    setQCount((prev) => prev + 1);
    setInterviewData((prev) => {
      return [
        ...prev,
        {
          question: question[qCount],
          answer: answerText,
          key: qCount,
        },
      ];
    });
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

  const handleStartCaptureClick = useCallback(() => {
    setRecording(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setRecording]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setRecording(false);

    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      setVideoData((prev) => {
        return [...prev, blob];
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recording.webm";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [mediaRecorderRef, setRecording, recordedChunks]);

  // 녹화된 데이터를 파일로 저장
  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recording.webm";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  useEffect(() => {
    if (completeSpeechState) {
      handleStartCaptureClick();
    }
  }, [completeSpeechState]);

  useEffect(() => {
    if (qCount === 6) {
      formData.append(
        "json",
        new Blob(
          [
            JSON.stringify({
              userId: userValue.userId,
              interviews: interviewData,
            }),
          ],
          {
            type: "application/json",
          }
        )
      );

      console.log(userValue.userId);
      console.log(interviewData);

      navigate("/");
    }
  }, [interviewData]);

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
        <img
          className={styles.webcamImage}
          width={640}
          height={360}
          src={AltCam}
          alt="cam"
        />
      </div>
      <div style={{ display: "none" }}>
        {qCount !== 0 ? <TextToSpeech question={question[qCount]} /> : null}
        {qCount !== 0 ? <SpeechToText onData={handleSTTData} /> : null}
      </div>
      {qCount === 5 ? (
        <button
          onClick={handleEndButton}
          className={styles.button}
          disabled={isLoading || ttsState}
        >
          종료
        </button>
      ) : (
        <button
          onClick={handleNextButton}
          className={styles.button}
          disabled={isLoading || ttsState}
        >
          {qCount !== 0 ? "다음" : "시작"}
        </button>
      )}
      {/* <Eyetracking /> */}
      <Webcam
        audio={true}
        height={360}
        ref={webcamRef}
        width={640}
        videoConstraints={videoConstraints}
        mirrored={true}
      ></Webcam>
      {recording ? (
        <button onClick={handleStopCaptureClick}>Stop Recording</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Recording</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
    </div>
  );
}

export default Mock;

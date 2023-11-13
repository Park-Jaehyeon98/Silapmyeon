import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { axiosMulti } from "../../api/axiosMultipart";
import { axiosAuth } from "../../api/settingAxios";
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

  //recoil 변수
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

  //state 변수
  const [question, setQuestion] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [interviewData, setInterviewData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [isVideoEnd, setIsVideoEnd] = useState(false);
  const [isInterviewEnd, setIsInterviewEnd] = useState(false);

  // user 정보
  const userValue = useRecoilValue(UserAtom);

  // 네비게이트 변수
  const navigate = useNavigate();

  // 영상 저장 관련 변수
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  // formData 변수
  const formData = useRef(new FormData());

  // 시작, 다음 함수
  function handleNextButton() {
    if (qCount !== 0) {
      // 다음을 누르면 면접 정보를 저장한다.
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
        // 녹화중이라면 녹화 중지
        mediaRecorderRef.current.stop();
        setRecording(false);
      }
    }

    // 질문 횟수를 늘리고 tts 준비
    setQCount((prev) => prev + 1);
    setTtsState(true);
    setSttState(true);
    setCompleteSpeechState(false);
  }

  // 종료 버튼
  function handleEndButton() {
    setQCount((prev) => prev + 1); // 마지막인것을 확인하기 위해 1 증가 후 마지막으로 저장
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
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }

  // stt가 시작하면 타이머 증가
  function handleSTTData(time) {
    setTimer(time);
  }

  // 시간 포맷 처리 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  // 녹화 시작 함수
  const handleStartCaptureClick = useCallback(() => {
    setRecording(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      // 데이터가 사용가능하면 이벤트 발생
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setRecording]);

  const handleDataAvailable = useCallback(
    // 데이터가 사용가능하면 녹화 데이터 저장
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  // tts 다 끝날 때 변경됨
  useEffect(() => {
    if (completeSpeechState) {
      handleStartCaptureClick();
    }
  }, [completeSpeechState]);

  // 녹화 데이터가 변경되었을 때 formdata에 추가하는 함수
  useEffect(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      const file = new File([blob], "blob.webm", { type: "video/webm" }); // blob을 file로 변환

      formData.current.append((qCount - 1).toString(), file);

      // 확인하려고 넣는 데이터
      setVideoData((prev) => {
        return [
          ...prev,
          {
            video: blob,
            key: (qCount - 1).toString(),
          },
        ];
      });

      // 데이터 비워주기
      setRecordedChunks([]);

      // 마지막 질문이라면 완료로 변경
      if (qCount === 6) {
        setIsVideoEnd(true);
      }
    }
  }, [recordedChunks]);

  useEffect(() => {
    if (qCount === 6) {
      // 마지막 질문이라면 모든 면접 데이터를 blob으로 바꿔서 넣어주기
      formData.current.append(
        "json",
        new Blob(
          [
            JSON.stringify({
              userId: userValue.userId,
              company: "",
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

      setIsInterviewEnd(true);
    }
  }, [interviewData]);

  useEffect(() => {
    console.log(videoData);
  }, [videoData]);

  useEffect(() => {
    console.log(isInterviewEnd, isVideoEnd);

    for (let [key, value] of formData.current.entries()) {
      console.log(`${key}: ${value.name}`);
    }

    if (isInterviewEnd && isVideoEnd) {
      axiosMulti
        .post("/report", formData.current)
        .then((request) => {
          console.log(request);
        })
        .catch((error) => {
          console.log(error);
        });

      // navigate("/");
    }
  }, [isInterviewEnd, isVideoEnd]);

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
      setIsLoading(false);
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <div style={{ display: "none" }}>
        <Webcam
          audio={true}
          height={360}
          ref={webcamRef}
          width={640}
          videoConstraints={videoConstraints}
          mirrored={true}
        ></Webcam>
      </div>
    </div>
  );
}

export default Mock;

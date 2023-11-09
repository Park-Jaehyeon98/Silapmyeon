import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useRecoilState } from "recoil";
import { completeSpeech, stt } from "../../atoms/atoms";
import styles from "./SpeechToText.module.css";

function SpeechToText({ onData }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [microphoneOn, setMicrophoneOn] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  const [completeSpeechState, setCompleteSpeechState] =
    useRecoilState(completeSpeech);
  const [sttState, setSttState] = useRecoilState(stt);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("마이크 권한이 허용되었습니다.");
      setMicrophoneOn(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("마이크 권한을 얻지 못했습니다.", error);
    }
  };

  useEffect(() => {
    if (completeSpeechState) {
      handleStartListening();
    }
  }, [completeSpeechState]);

  useEffect(() => {
    if (sttState) {
      handleResetTranscript();
    }
  }, [sttState]);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.log("브라우저에서 음성 인식을 지원하지 않습니다.");
      return;
    }

    requestMicrophonePermission();
  }, [browserSupportsSpeechRecognition]);

  const handleStartListening = () => {
    if (microphoneOn && !timerInterval) {
      //resetTranscript();
      console.log("음성 시작");
      SpeechRecognition.startListening({ continuous: true, language: "ko-KR" });

      // 시작할 때 타이머 시작
      const intervalId = setInterval(() => {
        setElapsedSeconds((prevTime) => prevTime + 1);
      }, 1000);
      setTimerInterval(intervalId);
    }
  };

  const handleStopListening = () => {
    console.log("음성 정지");
    SpeechRecognition.stopListening();

    // 음성 정지할 때 타이머 중지
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const handleResetTranscript = () => {
    resetTranscript();
    // 리셋 버튼을 누르면 타이머 초기화
    setElapsedSeconds(0);

    // 리셋 버튼을 누르면 음성 입력을 중지
    handleStopListening();

    setSttState(false);
  };

  useEffect(() => {
    onData(elapsedSeconds);
  }, [elapsedSeconds]);

  useEffect(() => {
    console.log("Transcript:", transcript);
  }, [transcript]);

  return (
    <div>
      <div className={styles.answerText}>{transcript}</div>
      <button className={styles.button} onClick={handleStopListening}>
        정지
      </button>
    </div>
  );
}

export default SpeechToText;

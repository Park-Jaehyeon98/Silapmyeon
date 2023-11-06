import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useRecoilState } from "recoil";
import { completeSpeech } from "../../atoms/atoms";
import "./SpeechToText.module.css";

function SpeechToText() {
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  useEffect(() => {
    handleStartListening();
  }, [completeSpeechState]);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.log("브라우저에서 음성 인식을 지원하지 않습니다.");
      return;
    }

    requestMicrophonePermission();
  }, [browserSupportsSpeechRecognition]);

  const handleStartListening = () => {
    if (microphoneOn && !timerInterval) {
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
  };

  useEffect(() => {
    console.log("Transcript:", transcript);
  }, [transcript]);

  return (
    <div>
      <p>마이크: {microphoneOn ? (listening ? "켜짐" : "꺼짐") : "꺼짐"}</p>
      <p>타이머: {formatTime(elapsedSeconds)}</p>
      <button onClick={handleStartListening}>시작</button>
      <button onClick={handleStopListening}>정지</button>
      <button onClick={handleResetTranscript}>리셋</button>
      <p>음성 입력: {transcript}</p>
    </div>
  );
}

export default SpeechToText;

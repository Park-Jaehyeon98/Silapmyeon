import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { completeSpeech } from "../../atoms/atoms";
import "./TextToSpeech.module.css"; // CSS 파일 경로에 주의

function TextToSpeech({ question }) {
  const synthesis = window.speechSynthesis;

  const [completeSpeechState, setCompleteSpeechState] =
    useRecoilState(completeSpeech);

  const speakText = () => {
    if (synthesis.speaking) {
      synthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(question);
    utterance.lang = "ko-KR";
    utterance.addEventListener("end", (event) => {
      console.log("ok");
      setCompleteSpeechState((prev) => !prev);
    });

    synthesis.speak(utterance);
  };

  return (
    <div className="text-to-speech">
      <textarea
        className="text-input"
        value={question}
        placeholder="변환할 한국어 텍스트를 입력하세요."
        readOnly
      />
      <button className="speak-button" onClick={speakText}>
        음성으로 변환
      </button>
    </div>
  );
}

export default TextToSpeech;

import React, { useState } from "react";
import "./TextToSpeech.module.css"; // CSS 파일 경로에 주의

function TextToSpeech() {
  const [text, setText] = useState("");
  const synthesis = window.speechSynthesis;

  const speakText = () => {
    if (synthesis.speaking) {
      synthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    synthesis.speak(utterance);
  };

  return (
    <div className="text-to-speech">
      <textarea
        className="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="변환할 한국어 텍스트를 입력하세요."
      />
      <button className="speak-button" onClick={speakText}>
        음성으로 변환
      </button>
    </div>
  );
}

export default TextToSpeech;

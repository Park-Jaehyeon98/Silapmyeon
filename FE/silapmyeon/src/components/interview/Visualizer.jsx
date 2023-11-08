import React, { useEffect, useRef } from "react";

const Visualizer = () => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    // 오디오 컨텍스트와 애널라이저 노드 초기화
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 마이크 입력 받기
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const microphone = audioContextRef.current.createMediaStreamSource(stream);
        microphone.connect(analyserRef.current);
        draw();
      })
      .catch((error) => {
        console.log("Error accessing the microphone", error);
      });

    // 데이터 시각화 함수
    const draw = () => {
      animationFrameIdRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);

      canvasContext.fillStyle = "rgb(0, 0, 0)";
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);

      let barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        canvasContext.fillStyle = `rgb(${barHeight + 100},50,50)`;
        canvasContext.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    };

    return () => {
      // 컴포넌트 언마운트시 정리
      cancelAnimationFrame(animationFrameIdRef.current);
      audioContextRef.current.close();
    };
  }, []);

  return <canvas width="300" height="100" ref={canvasRef} />;
};

export default Visualizer;

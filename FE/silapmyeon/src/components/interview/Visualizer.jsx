import React, { useEffect, useRef } from "react";

const Visualizer = () => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    // 오디오 컨텍스트와 애널라이저 노드 초기화
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048; // FFT 사이즈 설정
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 마이크 입력 받기
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const microphone =
          audioContextRef.current.createMediaStreamSource(stream);
        microphone.connect(analyserRef.current);
        draw();
      })
      .catch((error) => {
        console.log("Error accessing the microphone", error);
      });

    let frameCount = 0;
    const frameSkip = 2;
    // 데이터 시각화 함수
    const draw = () => {
      frameCount++;

      if (frameCount >= frameSkip) {
        analyserRef.current.getByteTimeDomainData(dataArray); // 시간 영역 데이터를 사용하여 물결모양 그리기

        canvasContext.fillStyle = "#f3f3f3";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        canvasContext.lineWidth = 1;
        canvasContext.strokeStyle = "rgb(0, 0, 0)";

        canvasContext.beginPath();

        let sliceWidth = (canvas.width * 1.0) / bufferLength;
        let x = 0;

        // dataArray를 순회하면서 선을 그린다
        for (let i = 0; i < bufferLength; i++) {
          let v = dataArray[i] / 128.0; // 0과 1 사이의 값으로 정규화
          let y = (v * canvas.height) / 2;

          if (i === 0) {
            canvasContext.moveTo(x, y);
          } else {
            canvasContext.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasContext.lineTo(canvas.width, canvas.height / 2);
        canvasContext.stroke();

        frameCount = 0;
      }

      animationFrameIdRef.current = requestAnimationFrame(draw);
    };

    return () => {
      // 컴포넌트 언마운트시 정리
      cancelAnimationFrame(animationFrameIdRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return <canvas width="300" height="50" ref={canvasRef} />;
};

export default Visualizer;

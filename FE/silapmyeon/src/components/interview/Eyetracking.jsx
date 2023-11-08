import React, { useState, useRef, useEffect } from "react";
import EasySeeso from "seeso/easy-seeso";
import Webcam from "react-webcam";
import styled from "styled-components";

const WaitScreen = styled.div`
  width: 100%;
  height: calc(100vh - 6.75rem);
  border-radius: 1.25rem;
  margin-bottom: 0.75rem;
  overflow: hidden;
  background-color: #e1e6f9;
  position: relative;
`;

const Eyetracking = () => {
  const webcamRef = useRef(null);
  const seesoRef = useRef(null);

  useEffect(() => {
    async function initializeSeeso() {
      seesoRef.current = new EasySeeso();

      // Seeso 초기화 및 설정
      await seesoRef.current.init(
        "YOUR_API_KEY", // 여기에 실제 API 키를 설정해야 합니다.
        () => {
          // Seeso 초기화 성공 콜백
          console.log("Seeso initialized successfully.");
          // Seeso 초기화 후 webcam을 렌더링
          renderWebcam();
        },
        () => {
          // Seeso 초기화 실패 콜백
          console.error("Seeso initialization failed.");
        }
      );

      // Seeso 시작 (웹캠을 사용하기 전에 Seeso를 시작해야 함)
      await seesoRef.current.startTracking(
        (gazeInfo) => {
          // 눈의 움직임을 추적하는 콜백
          console.log("Gaze Info:", gazeInfo);
        },
        (FPS, latency_min, latency_max, latency_avg) => {
          // 디버그 정보 콜백
          console.log("FPS:", FPS);
          console.log("Latency (min/max/avg):", latency_min, latency_max, latency_avg);
        }
      );
    }

    // Seeso 초기화 함수 호출
    initializeSeeso();
  }, []);

  // Webcam을 렌더링하는 함수
  const renderWebcam = () => {
    if (webcamRef.current) {
      webcamRef.current.video = webcamRef.current.getCanvas();
    }
  };

  return (
    <>
      <WaitScreen>
        <canvas
          id="output"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 9999,
          }}
        />
        {webcamRef.current && (
          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              width: "100%",
              height: "auto",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            audio={false} // 오디오 캡처 여부 설정 (true 또는 false)
          />
        )}
      </WaitScreen>
    </>
  );
};

export default Eyetracking;

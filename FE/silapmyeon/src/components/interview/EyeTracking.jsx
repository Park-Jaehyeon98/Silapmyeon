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
  const redDotRef = useRef(null);
  const canvasRef = useRef(null);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    async function initializeSeeso() {
      seesoRef.current = new EasySeeso();

      console.log(seesoRef.current);

      try {
        await seesoRef.current.init(
          "dev_d03ggj6oucg00iqkntoyvcwohq06wgy9vgad0obt",
          () => {
            console.log("Seeso initialized successfully.");
            renderWebcam();
          },
          () => {
            console.log(seesoRef.current);
            console.error("Seeso initialization failed.");
          }
        );

        await seesoRef.current.startTracking(
          (gazeInfo) => {
            // console.log("Gaze Info:", gazeInfo);
            updateRedDotPosition(gazeInfo);
          },
          (FPS, latency_min, latency_max, latency_avg) => {
            // console.log("FPS:", FPS);
            // console.log("Latency (min/max/avg):", latency_min, latency_max, latency_avg);
          }
        );
      } catch (error) {
        console.error("Seeso initialization error:", error);
      }
    }

    initializeSeeso();
  }, []);

  const renderWebcam = () => {
    if (webcamRef.current) {
      const monitorWidth = window.innerWidth;
      const monitorHeight = window.innerHeight;
      webcamRef.current.video.width = monitorWidth;
      webcamRef.current.video.height = monitorHeight;
      canvasRef.current.width = monitorWidth;
      canvasRef.current.height = monitorHeight;
    }
  };

  const updateRedDotPosition = (gazeInfo) => {
    const dotSize = 10;
    const x =
      (window.innerWidth - dotSize) / 2 + gazeInfo.x * window.innerWidth;
    const y =
      (window.innerHeight - dotSize) / 2 + gazeInfo.y * window.innerHeight;

    if (
      gazeInfo.x < 0 ||
      gazeInfo.x > 1920 ||
      gazeInfo.y < 0 ||
      gazeInfo.y > 1080
    ) {
      setCnt((prev) => prev + 1);
      redDotRef.current.style.display = "none";
    } else {
      setDotPosition({ x, y });
      redDotRef.current.style.display = "block";
    }
  };

  useEffect(() => {
    console.log("cnt:", cnt);
  }, [cnt]);

  return (
    <>
      <div style={{ position: "relative" }}>
        {webcamRef.current && (
          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              width: "1400px",
              height: "2000px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            audio={false}
          />
        )}
        <div
          ref={redDotRef}
          style={{
            position: "absolute",
            width: "30px",
            height: "30px",
            backgroundColor: "red",
            borderRadius: "50%",
            zIndex: 10000,
            left: dotPosition.x + "px",
            top: dotPosition.y + "px",
          }}
        />
        <canvas
          id="output"
          ref={canvasRef}
          style={{
            position: "absolute",
            height: "1400px",
            width: "2000px",
            zIndex: 9999,
            opacity: 0.5,
          }}
        />
      </div>
    </>
  );
};

export default Eyetracking;

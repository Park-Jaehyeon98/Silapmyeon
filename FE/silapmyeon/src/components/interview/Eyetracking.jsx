// Import necessary dependencies
import React, { useEffect, useState } from "react";
import webgazer from "webgazer";
import styles from "./Eyetracking.module.css"; // Import the CSS module

function EyeTracking() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const updateCoordinates = (data) => {
    if (data) {
      const { x, y } = data;
      setCoordinates({ x, y });
    }
  };

  useEffect(() => {
    // Initialize WebGazer
    webgazer
      .init()
      .then(() => {
        // Set up a gaze listener
        webgazer.setGazeListener(updateCoordinates);

        // Additional code to load the model
        webgazer
          .setTracker("TFFaceMesh")
          .setGazePrediction((prediction) => {
            // Do something with the gaze prediction data if needed
          });

        // Start WebGazer
        webgazer.begin();
      })
      .catch((err) => {
        console.error("WebGazer initialization error:", err);
      });

    return () => {
      webgazer.end();
    };
  }, []);

  return (
    <div className={styles["eye-tracking"]}>
      <h2 className={styles["heading"]}>Eye Tracking Component</h2>
      <p>Open the webcam to track your eye movements.</p>
      <p>Gaze X: {coordinates.x}</p>
      <p>Gaze Y: {coordinates.y}</p>
    </div>
  );
}

export default EyeTracking;

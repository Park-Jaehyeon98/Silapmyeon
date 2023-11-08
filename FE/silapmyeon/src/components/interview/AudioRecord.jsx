import { useState, useRef, useEffect } from "react";

function AudioRecord({ onData }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  const startRecording = () => {
    if (isBlocked) {
      console.log("Permission Denied");
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
        audioChunksRef.current = [];
      })
      .catch(() => {
        setIsBlocked(true);
      });

    const intervalId = setInterval(() => {
      setElapsedSeconds((prevTime) => prevTime + 1);
    }, 1000);
    setTimerInterval(intervalId);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);

    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const downloadRecording = () => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = audioUrl;
    a.download = "recording.wav";
    a.click();
    window.URL.revokeObjectURL(audioUrl);
  };

  useEffect(() => {
    onData(elapsedSeconds);
  }, [elapsedSeconds]);

  // Check for media devices support when the component mounts
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setIsBlocked(false))
      .catch(() => setIsBlocked(true));
  }, []);

  return (
    <div>
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {audioUrl && (
        <div>
          <audio src={audioUrl} controls />
          <button onClick={downloadRecording}>Download</button>
        </div>
      )}
    </div>
  );
}

export default AudioRecord;

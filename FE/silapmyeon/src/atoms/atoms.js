import { atom } from "recoil";

export const camState = atom({
  key: "camState",
  default: true,
});

export const questionCount = atom({
  key: "questionCount",
  default: 0,
});

export const completeSpeech = atom({
  key: "completeSpeech",
  default: false,
});

export const tts = atom({
  key: "tts",
  default: false,
});

export const stt = atom({
  key: "stt",
  default: false,
});

export const selectedType = atom({
  key: "selectedType",
  default: "/interview/mock",
});

export const selectedQuestion = atom({
  key: "selectedQuestion",
  default: "자소서",
});

export const resumeId = atom({
  key: "resumeId",
  default: 0,
});

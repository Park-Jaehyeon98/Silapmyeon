import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "interview",
  storage: sessionStorage,
});

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
  effects_UNSTABLE: [persistAtom],
});

export const selectedQuestion = atom({
  key: "selectedQuestion",
  default: "자소서",
  effects_UNSTABLE: [persistAtom],
});

export const resumeId = atom({
  key: "resumeId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const answer = atom({
  key: "answer",
  default: "",
});

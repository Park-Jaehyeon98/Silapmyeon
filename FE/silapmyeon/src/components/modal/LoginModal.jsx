import React, { useRef } from "react";
import "./LoginModal.css";
import useOutSideClick from "../../hooks/useOutSideClick";
import { useRecoilValue } from "recoil";
import { IsLoginSelector } from "../../Recoil/UserAtom";
import kakaoLogo from "../../assets/provider/kakao.png";
import naverLogo from "../../assets/provider/naver.png";
import googleLogo from "../../assets/provider/google.png";
import closeBtn from "../../assets/button/close-outline.png";

const providerList = [
  {
    text: "kakao",
    href: "http://silapmyeon.com:8080/oauth2/authorization/kakao",
  },
  {
    text: "naver",
    href: "http://silapmyeon.com:8080/oauth2/authorization/naver",
  },
  {
    text: "google",
    href: "http://silapmyeon.com:8080/oauth2/authorization/google",
  },
];

var logoObj = { kakao: kakaoLogo, naver: naverLogo, google: googleLogo };

function LoginModal({ onClose }) {
  const modalRef = useRef(null);
  const isLogin = useRecoilValue(IsLoginSelector);
  console.log("isLogin =>>>>>>" + isLogin);

  const handleClose = () => {
    onClose?.();
    console.log("close button");
  };

  useOutSideClick(modalRef, handleClose);

  return (
    <div className="overlay">
      <div className="modalWrap" ref={modalRef}>
        <div className="close">
          <button className="closeButton" onClick={handleClose}>
            <img src={closeBtn} />
          </button>
        </div>

        <div className="contents">
          <h1 className="title">실전압축면접</h1>
          <div className="loginbody">
            <span className="message">기존 계정으로 간단하게 시작하세요.</span>

            <ul className="provider">
              {providerList.map((provider) => {
                return (
                  <li key={provider.text}>
                    <button
                      onClick={() => {
                        window.location.href = provider.href;
                      }}
                      className={provider.text}
                    >
                      <img
                        className="providerlogo"
                        src={logoObj[provider.text]}
                        alt={provider.text}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;

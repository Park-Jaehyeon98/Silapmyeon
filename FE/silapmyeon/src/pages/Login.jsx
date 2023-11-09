import React from "react";
import { useRecoilValue } from "recoil";
import { IsLoginSelector } from "../Recoil/UserAtom";
import kakaoLogo from "../assets/provider/kakao.png";
import naverLogo from "../assets/provider/naver.png";
import googleLogo from "../assets/provider/google.png";

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

export default function Login() {
  const isLogin = useRecoilValue(IsLoginSelector);
  console.log("isLogin =>>>>>>" + isLogin);

  return (
    <div className="loginPage">
      <div className="loginbody">
        <span className="message">
          로그인이 필요한 페이지 입니다. <br />
          기존 계정으로 간단하게 시작하세요.
        </span>
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
  );
}

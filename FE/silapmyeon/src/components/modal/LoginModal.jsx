import React, { useEffect, useRef, useState } from "react";
import './LoginModal.css';
import useOutSideClick from "../../hooks/useOutSideClick";
import { useRecoilValue } from "recoil";
import { IsLoginSelector, UserAtom } from "../../Recoil/UserAtom";

const providerList = [
    { text: 'kakao', href: 'http://silapmyeon.com:8080/oauth2/authorization/kakao', },
    { text: 'naver', href: 'http://silapmyeon.com:8080/oauth2/authorization/naver' },
    { text: 'google', href: 'http://silapmyeon.com:8080/oauth2/authorization/google' },
];

function LoginModal({ onClose }) {
    const modalRef = useRef(null);
    const isLogin = useRecoilValue(IsLoginSelector);
    console.log("isLogin =>>>>>>" + isLogin)

    const handleClose = () => {
        onClose?.();
        console.log("close button")
    };

    useOutSideClick(modalRef, handleClose);


    return (
        <div className="overlay">
            <div className="modalWrap" ref={modalRef}>

                <div className="close">
                    <button className="closeButton" onClick={handleClose}>
                        <img src='/icon/button/close-outline.png'/>
                    </button>
                </div>
                
                <div className="contents">
                    <h1 className="title">실압면</h1>
                    <div className="loginbody">
                        <span className="message">
                            기존 계정으로 간단하게 시작하세요.
                        </span>

                        <ul className="provider">
                            {providerList.map((provider) => {
                            return (
                                <li key={provider.text}>
                                
                                <button
                                    onClick={() => {
                                        // console.log(`styles.${provider.text}`)
                                       
                                        window.location.href = provider.href;
                                    }}
                                    className={provider.text} 
                                    // className={`styles.${provider.text} styles.kakao`}
                                >
                                    <img
                                    className="providerlogo"
                                    src={`/icon/provider/${provider.text}.svg`}
                                    alt={provider.text}
                                    />
                                </button>
                                
                                
                                {/* <span className="subMessage">{`${provider.text.toUpperCase()}로 계속하기`}</span> */}
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
import React, { useEffect, useState } from "react";
import "../../styles/sidebar.css";
import { useRecoilValue } from "recoil";
import { IsLoginSelector } from "../../Recoil/UserAtom";
import Modal from "../modal/ProfileModal";
import { Link } from "react-router-dom";

function Side() {
  // const [userNickname, setUserNickName] = useState('');
  const [userProfileUrl, setUserProfileUrl] = useState("");
  const [userNickname, setUserNickName] = useState("");
  const isLogin = useRecoilValue(IsLoginSelector);
  const [isOpen, setOpen] = useState(false);
  const [myPageActive, setMyPageActive] = useState(false);

  useEffect(() => {
    const User = JSON.parse(sessionStorage.getItem("user"))?.UserAtom;
    console.log("sidebar user---------------------->" + User);
    setUserProfileUrl(User?.userProfileUrl);
    setUserNickName(User?.userNickname);
  }, [isLogin, userProfileUrl, isOpen, userNickname]);

  const handleClick = () => {
    setOpen(true);
  };

  const toggleMyPage = () => {
    setMyPageActive(!myPageActive);
  };

  return (
    <div className="sidebar">
      <div className="img">
        {isLogin ? (
          <img
            className="profileImg"
            src={userProfileUrl}
            onClick={handleClick}
            alt="profile"
          />
        ) : (
          <img className="profileImg" alt="profile" />
        )}
      </div>
      <div>
        {isOpen && (
          <Modal
            open={isOpen}
            onClose={() => {
              setOpen(false);
            }}
          />
        )}
      </div>
      {/* <div>
                    {userNickname}님 안녕하세요
                </div> */}
      <Link to={"/interview"} className="link">
        <div className="sidebarText">모의면접</div>
      </Link>
      <div className="sidebarItem">
        <div className="sidebarText">마이페이지</div>
          <div className="sidebarSubMenu">
            <Link to={"/resume"} className="link">
              <div className="sidebarSmallText">자소서</div>
            </Link>
            <Link to={"/report/list/1"} className="link">
              <div className="sidebarSmallText">면접 리포트</div>
            </Link>
            <Link to={"/review"} className="link">
              <div className="sidebarSmallText">면접 후기</div>
            </Link>
          </div>
      </div>
      <Link to={"/community"} className="link">
        <div className="sidebarText">면접 공유</div>
      </Link>
    </div>
  );
}

export default Side;

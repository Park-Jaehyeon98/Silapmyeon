import "../../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IsLogin, IsLoginSelector, UserAtom } from "../../Recoil/UserAtom";
import { useState } from "react";
import LoginModal from "../modal/LoginModal";
import { logoutUser } from "../../api/userAPI";

function Header() {
  const setUserValue = useSetRecoilState(UserAtom);
  const setIsLogin = useSetRecoilState(IsLogin);
  const navigate = useNavigate();

  var isLogin = useRecoilValue(IsLoginSelector);

  const handleLogout = () => {
    logoutUser().then(() => {
      setUserValue({});
      setIsLogin(false);
      sessionStorage.removeItem("user");
      // console.log("로그아웃 -------------" + isLogin);

      navigate("/intro");
    });
  };

  const loginClick = () => {
    // 로그인 모달
    setOpen(true);
  };

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="header">
      {isLogin ? (
        <Link to="/home" className="logo">
          LOGO
        </Link>
      ) : (
        <Link to="/intro" className="logo">
          LOGO
        </Link>
      )}
      {isLogin ? (
        <button className="loginbutton" onClick={handleLogout}>
          로그아웃
        </button>
      ) : (
        <button to="/login" className="loginbutton" onClick={loginClick}>
          {" "}
          로그인
        </button>
      )}

      {isOpen && (
        <LoginModal
          open={isOpen}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Header;

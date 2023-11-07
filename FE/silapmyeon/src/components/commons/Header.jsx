import "../../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IsLogin, IsLoginSelector, UserAtom } from "../../Recoil/UserAtom";

function Header() {

   const setUserValue = useSetRecoilState(UserAtom);
   const setIsLogin = useSetRecoilState(IsLogin);
   const navigate = useNavigate();

    var isLogin = useRecoilValue(IsLoginSelector);

    const handleLogout = () =>{
      console.log("click logout")
      setUserValue({})
      setIsLogin(false)
      sessionStorage.removeItem('user')
      
      console.log("로그아웃 -------------" + isLogin)

      navigate('/');
    }

  return (
    <div className="header">

      {isLogin? <Link to="/home" className="logo">LOGO</Link>:<Link to="/intro" className="logo">LOGO</Link> }
      {isLogin? <button onClick={handleLogout}>로그아웃</button> : <Link to="/login" className="logout"> 로그인</Link> }
      
      <Link to="/mypage" > 유저전용</Link>
    </div>
  );
}

export default Header;

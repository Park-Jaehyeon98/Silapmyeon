import React from "react";
import "./Home.css";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../Recoil/UserAtom";

function Home() {
  const userValue = useRecoilValue(UserAtom);

  return (
    <div className="home">
      <div className="hello">{userValue.userNickname}님</div>
    </div>
  );
}

export default Home;

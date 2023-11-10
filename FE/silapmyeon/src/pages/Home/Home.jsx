import React, { useEffect, useState } from "react";
import "./Home.css";
import { getUser } from "../../api/userAPI";
import { useRecoilState, useRecoilValue } from "recoil";
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

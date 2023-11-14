import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/settingAxios";
import base64 from "base-64";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IsLogin, UserAtom } from "../Recoil/UserAtom";

const RedirectionPage = () => {
  const [userValue, setUserValue] = useRecoilState(UserAtom);
  const setIsLogin = useSetRecoilState(IsLogin);
  const accessToken = new URL(window.location.href).searchParams.get(
    "accessToken"
  );
  const refreshToken = new URL(window.location.href).searchParams.get(
    "refreshToken"
  );
  const navigate = useNavigate();
  const location = useLocation();

  // console.log("location" + location);
  const from = location?.state?.redirectedFrom?.pathname || "/home";
  // console.log(from + "으로 이동")

  useEffect(() => {
    axios({
      method: "GET",
      url: BASE_URL + "/user",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: accessToken,
      },
    }).then((res) => {
      var payload = accessToken.substring(
        accessToken.indexOf(".") + 1,
        accessToken.lastIndexOf(".")
      );
      var dec = base64.decode(payload);
      const parsedPayload = JSON.parse(dec);
      const parsedUser = JSON.parse(parsedPayload.sub);

      setUserValue({
        ...userValue,
        accessToken: accessToken,
        refreshToken: refreshToken,
        userId: parsedUser.userId,
        userEmail: parsedUser.userEmail,
        userNickname: res.data.userNickname,
        userProfileUrl: res.data.userProfileUrl,
      });

      setIsLogin(true);
      navigate(from);
    });
  }, []);

  return (
    <div className="LoginHandeler">
      <p>로그인 중입니다.</p>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
};

export default RedirectionPage;

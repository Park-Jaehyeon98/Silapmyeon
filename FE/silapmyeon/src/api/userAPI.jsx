import { axiosAuth } from "./settingAxios";

// 회원 정보 조회
export const getUser = async () => {
  const reqUrl = "/user";
  try {
    const response = await axiosAuth.get(reqUrl);
    console.log(
      "회원정보 조회 결과:------------------>" + JSON.stringify(response.data)
    );
    return response.data;
  } catch (error) {
    console.error("Request error", error);
    throw error;
  }
};

// 회원 정보 수정
export const editUser = async (userNickname) => {
  const reqUrl = "/user";
  const body = {
    userNickname: userNickname,
  };
  try {
    const response = await axiosAuth.put(reqUrl, body);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Request error", error);
    throw error;
  }
};
<<<<<<< HEAD

export const logoutUser = async () => {
  const reqUrl = "/token/logout";
  try {
    const response = await axiosAuth.post(reqUrl);
    return response.data;
  } catch (error) {
    console.error("Request error", error);
    throw error;
  }
};
=======
>>>>>>> 8df07267d76c0b36908c2a9b481807ecd0da4cdb

// 회원 탈퇴
export const deleteUser = async () => {
  const reqUrl = "/user";
  try {
    const response = await axiosAuth.delete(reqUrl);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Request error", error);
    throw error;
  }
};

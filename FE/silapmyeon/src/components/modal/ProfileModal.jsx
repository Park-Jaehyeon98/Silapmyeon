import React, { useEffect, useRef, useState } from "react";
import styles from "./ProfileModal.module.css";
import { editUser, getUser } from "../../api/userAPI";
import useOutSideClick from "../../hooks/useOutSideClick";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../Recoil/UserAtom";
import closeBtn from "../../assets/button/close-outline.png";

function ProfileModal({ onClose }) {
  const modalRef = useRef(null);
  const [userNickname, setUserNickName] = useState("");
  const [userValue, setUserValue] = useRecoilState(UserAtom);

  useEffect(() => {
    getUser().then((res) => {
      setUserNickName(res.userNickname);
    });
  }, []);
  const handleClose = () => {
    onClose?.();
    console.log("close button");
  };

  useOutSideClick(modalRef, handleClose);

  const handleNickname = (e) => {
    setUserNickName(e.target.value);
  };

  const updateBtn = (e) => {
    console.log(e);
    e.preventDefault();
    editUser(userNickname).then((res) => {
      console.log("회원정보 수정 결과: " + JSON.stringify(res));
      let editedUser = { ...userValue };
      editedUser.userNickname = res.data.userNickname;
      setUserValue(editedUser);
    });
    handleClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalWrap} ref={modalRef}>
        <div className={styles.close}>
          <button className={styles.closeButton} onClick={handleClose}>
            <img src={closeBtn} />
          </button>
        </div>

        <div className={styles.contents}>
          <h1 className={styles.title}>프로필 수정</h1>
          <form className={styles.nickname} onSubmit={updateBtn} id="editForm">
            닉네임{" "}
            <input
              type="text"
              className={styles.input}
              name="userNickname"
              onChange={handleNickname}
              value={userNickname}
            ></input>
          </form>
          <button className={styles.button} type="submit" form="editForm">
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;

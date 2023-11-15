import React, { useEffect, useRef, useState } from "react";
import styles from "./InformationModal.module.css";
import { getUser } from "../../api/userAPI";
import useOutSideClick from "../../hooks/useOutSideClick";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../Recoil/UserAtom";
import closeBtn from "../../assets/button/close-outline.png";

function InformationModal({ onClose }) {
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
          <h1 className={styles.title}>실압면 TIP</h1>
          <div>
            <h3 className={styles.h3}>모의 면접</h3>
            <div>
              <div className={styles.text}>
                시작을 누르면 면접이 시작됩니다!
              </div>
              <div className={styles.text}>
                다음을 누르면 다음 질문으로 넘어갈 수 있습니다!
              </div>
              <div className={styles.text}>
                질문이 끝난 뒤 녹화가 시작되고, 타이머가 2분이 되면 자동으로
                다음으로 넘어갑니다!
              </div>
            </div>
            <h3 className={styles.h3}>자율 연습</h3>
            <div>
              <div className={styles.text}>
                연습 문항 질문과 답변을 직접 작성하세요!
              </div>
              <div className={styles.text}>
                작성한 답변을 토대로 녹음을 해보세요!
              </div>
              <div className={styles.text}>
                숨기기 버튼을 통해 답변을 보지 않고 연습이 가능합니다!
              </div>
            </div>
            <h3 className={styles.h3}>연습 면접</h3>
            <div>
              <div className={styles.text}>
                시작을 누르면 면접이 시작됩니다!
              </div>
              <div className={styles.text}>
                다시하기를 누르면 같은 질문에 대한 답변을 다시 할 수 있습니다!
              </div>
              <div className={styles.text}>
                질문 횟수를 통해 몇 번째 질문인지 확인할 수 있습니다!
              </div>
              <div className={styles.text}>
                정지 버튼을 통해 내가 한 답변을 확인해보세요!
              </div>
            </div>

            <h3 className={styles.h3}>유의사항</h3>
            <div>
              <div className={styles.text}>
                조용한 환경에서 면접을 진행해주세요!
              </div>
              <div className={styles.text}>
                마이크와 웹캠 연결 상태를 확인해주세요!
              </div>
              <div className={styles.text}>모든 면접의 문항은 5개 입니다!</div>
              <div className={styles.text}>
                모의 면접은 하울링이 있을 수 있습니다!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationModal;

import { axiosAuth } from "../../api/settingAxios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ResumeDetailStyle.module.css";

function ResumeDetail() {
  const [resume, setResume] = useState(null);
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const getResume = async () => {
    const res = await axiosAuth.get(`/resume/${resumeId}`);
    console.log(res.data);
    setResume(res.data);
  };

  const removeResume = async () => {
    if (window.confirm("자기소개서를 삭제하시겠습니까?")) {
      const res = await axiosAuth.delete(`/resume/${resumeId}`);
      console.log(res.data);
      navigate("/resume");
    }
  };

  const [num, setNum] = useState(0);
  const changeNum = (n) => {
    setNum(n);
  };

  const navigateToModify = () => {
    navigate("modify", { state: { resume } });
  };

  useEffect(() => {
    getResume();
  }, []);

  const navigateToList = () => {
    navigate("/resume");
  };

  return (
    <div style={{ height: "100vh" }}>
      {resume === null ? null : (
        <div>
          <div className={styles.title}>
            <div className={styles.titleText}>{resume.companyName} 자소서</div>
          </div>
          <div className={styles.interviewDate}>
            <div className={styles.interview}>면접일 </div>
            <div className={styles.date}>{resume.interviewDate} </div>
          </div>
          <div className={styles.box}>
            <div style={{ top: "9px", position: "absolute" }}>
              {/* 자소서 항목만큼 버튼 생성, 버튼 클릭시 해당 자소서 항목으로 전환 */}
              {resume.resumeItems.map((resumeItem, idx) => (
                <div>
                  <button
                    key={idx}
                    className={`${styles.button} ${
                      num === idx ? styles.selectedButton : ""
                    }`}
                    onClick={() => changeNum(idx)}
                  >
                    {idx + 1}
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.content}>
              <div className={styles.question}>
                {resume.resumeItems[num].resumeQuestion}
              </div>
              <div className={styles.answer}>
                {resume.resumeItems[num].resumeAnswer}
              </div>
            </div>
          </div>
          <button className={styles.modify} onClick={navigateToModify}>
            수정
          </button>
          <button className={styles.delete} onClick={removeResume}>
            삭제
          </button>
          <button className={styles.list} onClick={navigateToList}>
            목록
          </button>
        </div>
      )}
    </div>
  );
}

export default ResumeDetail;

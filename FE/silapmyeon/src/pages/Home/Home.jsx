import React, {useState, useEffect} from "react";
import { axiosAuth } from "../../api/settingAxios";
import Calendar from 'react-calendar';
import styles from "../../styles/Home.module.css";
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar.css'
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../Recoil/UserAtom";
import moment from 'moment';

function Home() {
  // 현재 날짜를 상태로 저장합니다.
  const [value, onChange] = useState(new Date())
  const userValue = useRecoilValue(UserAtom)
  const [resumes, setResumes] = useState(null)
  
  useEffect(() => {
    getResumes();
  }, [])

  const getResumes = async () => {
    const res = await axiosAuth.get(`/resume?page=${0}&keyword=${""}&true`);
    console.log("데이터 개수 : ", res.data.length);
    console.log("데이터 : ", res.data);
    setResumes(res.data.content);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.header}>{userValue.userNickname}님, 오늘도 화이팅하세요!</div>
        <div className={styles.topNavBody}>
          <div className={styles.headerDday}>
            <p>면접 D-DAY</p>
          </div>
          <div className={styles.interviewContainer}>
            {/* 면접 날자 캐러셀 예정 */}
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.bottomHeader}>면접 캘린더</div>
        <div className={styles.calendarWrapper}>
          <Calendar
            onChange={onChange}
            formatDay={(locale, date) => moment(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
            value={value}
            navigationLabel={null}
            showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

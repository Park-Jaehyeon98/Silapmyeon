import React, {useState, useEffect} from "react";
import styles from "../../styles/Home.module.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../Recoil/UserAtom";
import moment from 'moment';

function Home() {
  // 현재 날짜를 상태로 저장합니다.
  const [value, onChange] = useState(new Date())
  const userValue = useRecoilValue(UserAtom)
  
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.header}>{userValue.userNickname}님, 오늘도 화이팅하세요!</div>
        <div className={styles.topNavBody}>
          <div className={styles.headerDday}>
            <p>면접 D-DAY</p>
          </div>
          <div className={styles.interviewContainer}>
            
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
            className={`${styles.reactCalendar} ${styles.reactCalendar_navigation}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, {useState, useEffect} from "react";
import { axiosAuth } from "../../api/settingAxios";
import Calendar from 'react-calendar';
import styles from "../../styles/Home.module.css";
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar.css'
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../Recoil/UserAtom";
import moment from 'moment';
import InterviewCarousel from "./InterviewCarousel";

function Home() {
  // 현재 날짜를 상태로 저장합니다.
  const [value, onChange] = useState(new Date())
  const userValue = useRecoilValue(UserAtom)
  const [resumes, setResumes] = useState(null)
  const [interviewDates, setInterviewDates] = useState([])
  const [interviewCompanies, setInterviewCompanies] = useState([])
  const [interviews, setInterviews] = useState([])
  const currentDate = new Date();

  useEffect(() => {
    getResumes();
  }, []);

  useEffect(() => {
    if (resumes) {
      // resumes 데이터에서 면접 날짜 추출 및 변환
      const interviews = resumes.map(resume => ({
        date: new Date(resume.interviewDate),
        company: resume.companyName // 가정: resumes 객체에 companyName 속성이 있다고 가정
      }))
      .filter(interview => interview.date >= currentDate)
      .sort((a, b) => a.date - b.date); // 날짜 기준으로 정렬
      
      // console.log("정렬 객체 : ", interviews);
      // 날짜와 회사 이름을 별도의 배열로 추출
      const interviewDates = interviews.map(interview => interview.date);
      const interviewCompanies = interviews.map(interview => interview.company);

      setInterviews(interviews)
      setInterviewDates(interviewDates);
      setInterviewCompanies(interviewCompanies);
    }
  }, [resumes])
  
  const getResumes = async () => {
    const res = await axiosAuth.get(`/resume?isAll=true&keyword=${""}`);
    setResumes(res.data);
  };
  
  // 면접 날짜인지 확인하는 함수
  const isInterviewDay = (date) => {
    return interviewDates.some(interviewDate => 
      date.getFullYear() === interviewDate.getFullYear() &&
      date.getMonth() === interviewDate.getMonth() &&
      date.getDate() === interviewDate.getDate()
      );
    };
    
    // 해당 날짜에 면접이 몇 개 있는지 계산하는 함수
    const countInterviews = (date) => {
      return interviewDates.filter(interviewDate => 
        date.getFullYear() === interviewDate.getFullYear() &&
        date.getMonth() === interviewDate.getMonth() &&
        date.getDate() === interviewDate.getDate()
        ).length;
      };
      
      // 면접 날짜의 개수에 따라 표시할 텍스트를 결정하는 함수
      const interviewText = (date) => {
        const count = countInterviews(date);
        return count > 1 ? `${count}개의 면접` : '면접';
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
            <InterviewCarousel interviews={interviews}/>
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
            nextLabel={">"}
            prevLabel={"<"}
            // navigationLabel={null}
            showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
            tileContent={({ date, view }) => 
              view === 'month' && countInterviews(date) > 0 
              ? <div className={styles.interviewBox}>{interviewText(date)}</div> 
              : null
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

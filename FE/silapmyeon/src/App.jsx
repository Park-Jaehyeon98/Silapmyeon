import React from "react";
import "./App.css";
import Sidebar from "./components/commons/Side";
import Header from "./components/commons/Header";
import Home from "./pages/Home/Home";
import ResumeList from "./pages/resume/ResumeList";
import ResumeDetail from "./pages/resume/ResumeDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResumeCreate from "./pages/resume/ResumeCreate";
import ResumeModify from "./pages/resume/ResumeModify";
import TypeSelect from "./components/interview/TypeSelect";
import Preparation from "./components/interview/Preparation";
import Mock from "./components/interview/Mock";
import Practice from "./components/interview/Practice";
import Self from "./components/interview/Self";
import Login from "./pages/Login";
import RedirectionPage from "./pages/RedirectionPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import IntroPage from "./pages/IntroPage";
import MyPage from "./pages/MyPage";
import { useRecoilValue } from "recoil";
import { IsLoginSelector } from "./Recoil/UserAtom";
import ReviewList from "./pages/review/ReviewList";
import ReviewCreate from "./pages/review/ReviewCreate";
import ReviewDetail from "./pages/review/ReviewDetail";
import ReviewModify from "./pages/review/ReviewModify";
import ReportListView from "./pages/report/ReportListView";
import ReportDetailView from "./pages/report/ReportDetailView";
import Board from "./pages/Board/Board";
import BoardDetail from "./pages/Board/BoardDetail";
import BoardRegist from "./pages/Board/BoardRegist";
import BoardEdit from "./pages/Board/BoardEdit";

function App() {
  const isLogin = useRecoilValue(IsLoginSelector);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="main">
          {isLogin ? <Sidebar /> : <div></div>}
          <div className="page">
            {/* 홈 */}
            <Routes>
              <Route path="/" element={<IntroPage />} />
              <Route path="/intro" element={<IntroPage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/loginSuccess" //redirect_url
                element={<RedirectionPage />}
              />

              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/mypage" element={<MyPage />} />

                {/* 자기소개서 */}
                <Route path="/resume" element={<ResumeList />} />
                <Route path="/resume/:resumeId" element={<ResumeDetail />} />
                <Route
                  path="/resume/:resumeId/modify"
                  element={<ResumeModify />}
                />
                <Route path="/resume/create" element={<ResumeCreate />} />

                {/* 면접 */}
                <Route path="/interview" element={<TypeSelect />} />
                <Route
                  path="/interview/preparation"
                  element={<Preparation />}
                />
                <Route path="/interview/practice" element={<Practice />} />
                <Route path="/interview/mock" element={<Mock />} />
                <Route path="/interview/self" element={<Self />} />

                {/* 면접후기 */}
                <Route path="/review" element={<ReviewList />} />
                <Route path="/review/:reviewId" element={<ReviewDetail />} />
                <Route
                  path="/review/:reviewId/modify"
                  element={<ReviewModify />}
                />
                <Route path="/review/create" element={<ReviewCreate />} />

                {/* 모의면접 레포트 */}
                <Route
                  path="/report/list/:userId"
                  element={<ReportListView />}
                />
                <Route
                  path="/report/detail/:id"
                  element={<ReportDetailView />}
                />

                {/* 커뮤니티 게시글 */}
                <Route path="/community" element={<Board />} />
                <Route
                  path="/community/detail/:boardId"
                  element={<BoardDetail />}
                ></Route>
                <Route
                  path="community/regist"
                  element={<BoardRegist />}
                ></Route>
                <Route path="community/edit" element={<BoardEdit />}></Route>
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

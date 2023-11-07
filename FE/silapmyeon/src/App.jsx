import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Sidebar from "./components/commons/sidebar";
import Header from "./components/commons/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import RedirectionPage from "./pages/RedirectionPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute";
import IntroPage from "./pages/IntroPage";
import MyPage from "./pages/MyPage";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <div className="main">
        <Sidebar />
        <div className="page">
          {/* 홈 */}
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginSuccess" //redirect_url
              element={<RedirectionPage />} />

            <Route element={<ProtectedRoute/>}>
              <Route path="/home" element={<Home />} />
              <Route path="/mypage" element={<MyPage />} />
            </Route>
          </Routes>  
        </div>
      </div>
    </div>
  </BrowserRouter>

  );
}

export default App;

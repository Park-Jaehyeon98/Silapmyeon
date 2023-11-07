import React from "react";
import "./App.css";
import Sidebar from "./components/commons/sidebar";
import Header from "./components/commons/Header";
import Home from "./pages/Home/Home";
import TypeSelect from "./components/interview/TypeSelect";
import Preparation from "./components/interview/Preparation";
import Practice from "./components/interview/Practice";
import Mock from "./components/interview/Mock";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Sidebar />
        <div className="page">
          <Home />
          <TypeSelect />
          <Preparation />
          <Practice />
          {/* <Mock /> */}
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Sidebar from "./components/commons/sidebar";
import Header from "./components/commons/Header";
import Home from "./pages/Home/Home";
import TypeSelect from "./components/interview/TypeSelect";
import Preparation from "./components/interview/Preparation";

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
        </div>
      </div>
    </div>
  );
}

export default App;

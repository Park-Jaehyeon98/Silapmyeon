import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
//import './App.css';
import Sidebar from "./components/commons/sidebar";
import Header from "./components/commons/Header";
import ResumeList from "./pages/resume/ResumeList";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <ResumeList />
    </div>
  );
}

export default App;

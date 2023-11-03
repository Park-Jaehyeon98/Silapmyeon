import React from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import './App.css';
import Header from "./components/commons/Header";
import Side from './components/commons/Side';
import Home from "./pages/Home/Home"
import Board from './pages/Board/Board';
import BoardDetail from './pages/Board/BoardDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className='main'>
          <Side />
          <div className='page'>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/community" element={<Board/>}/>
                <Route path='/community/detail' element={<BoardDetail/>}></Route>
              </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
      
  );
}

export default App;

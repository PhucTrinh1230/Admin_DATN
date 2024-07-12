// import './App.css';

import React from "react";


import Game from './pages/Manage/GameImage/Game'
import Gametypes from "./pages/Manage/GameTypess/GameTypes";
import { Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import Order from "./pages/Manage/Order/Order";
import Keycode from "./pages/Manage/Keycodes/Keycode";
import GameSystemRequirement from "./pages/Manage/GameSystem/GameSystem";
import RankAccount from "./pages/Manage/RankAccount/rankAccount";

import Chart2 from "./pages/Manage/Stat/Chart2";

import Group from "./pages/Manage/Group/Group";

// import User from "./pages/User/User";


import Widgets from './pages/Widgets/widget';
import ChartDetail from "./pages/Manage/Stat/ChartDetail";

function App() {


  return (
    
    
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
        <Route path="" element={<Game />} />
          <Route path="/game" element={<Game />} />
          <Route path="/gametypes" element={<Gametypes />} />
          <Route path="/gametypes" element={<Gametypes />} />

          <Route path="/order" element={<Order/>} />
          <Route path="/keycode" element={<Keycode/>} />
          <Route path="/gamerqm" element={<GameSystemRequirement/>} />
          <Route path="/rankaccount" element={<RankAccount/>} />
          <Route path="/chart" element={<Chart2/>} />
          <Route path="/chartdetail" element={<ChartDetail/>}/>
          <Route path="/group" element={<Group/>} />

          


          <Route path="/widget" element={<Widgets />} />
          {/* <Route path="/user" element={<User />} /> */}


        </Routes>
      </Router>
    </div>
  
  );
}


export default App;

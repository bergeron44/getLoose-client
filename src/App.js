import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageForDates from './pages/HomePageForDates';
import HomePageForFriends from './pages/HomePageForFrindes'; 
import FirstPageDateOrFrinde from './pages/FirstPageDateOrFrinde';
import ChooseDate from './pages/ChooseDate';
import ChooseFrindes from './pages/ChooseFrindes' ;
import AnimatedLogo from './components/AnimatedLogo';  // Import the AnimatedLogo component
import BackToGame from './components/BackToGame'; 
import WaitingForApproval from './pages/WaitingForApproval';
import './App.css';
//bar pages implement
import TheRustyAnchor from './barLoginPages/The_Rusty_Anchor';
//end bar pages 

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="graffiti-headline">Get Loose</h1>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<FirstPageDateOrFrinde />} />
            <Route path="/TheRustyAnchor" element={<TheRustyAnchor />} />
            <Route path="/LogoPage" element={<AnimatedLogo />} />
            <Route path="/BackToGame" element={<BackToGame />} />
            <Route path="/HomePageForDates" element={<HomePageForDates />} />
            <Route path="/HomePageForFriends" element={<HomePageForFriends />} />
            <Route path="/ChooseDate" element={<ChooseDate />} />
            <Route path="/ChooseFrindes" element={<ChooseFrindes />} />
            <Route path="/page2" element={<FirstPageDateOrFrinde />} />
            <Route path="/page3" element={<FirstPageDateOrFrinde />} />
            <Route path="/WaitingForApproval" element={<WaitingForApproval />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

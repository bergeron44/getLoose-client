import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageForDates from './pages/HomePageForDates';
import HomePageForFriends from './pages/HomePageForFrindes'; 
import FirstPageDateOrFrinde from './pages/FirstPageDateOrFrinde';
import ChooseDate from './pages/ChooseDate';
import ChooseFrindes from './pages/ChooseFriends';
import AnimatedLogo from './components/AnimatedLogo';  // Import the AnimatedLogo component
import BackToGame from './components/BackToGame'; 
import WaitingForApproval from './pages/WaitingForApproval';
import DateGame from './pages/DateGame';
import FrindesGame from './pages/FrindesGame';
import Instruction from './pages/Instruction';
import './App.css';
//try games
import GuessWhatIAm from './pages/Games/GuessWhatIAm';

// Bar pages
import BarTable from './barLoginPages/BarTable';
import NotInBar from './barLoginPages/NotInBar';
import TheRustyAnchor from './barLoginPages/The_Rusty_Anchor';
import Admin from './barLoginPages/Admin';
import NavigatePage from './barLoginPages/NavigatePage';

// Add to database pages
import AddQuestion from './pages/DataBaseUiConection/AddQuestion';
import AddBar from './pages/DataBaseUiConection/AddBar';
import AddPackage from './pages/DataBaseUiConection/AddPackage';

import DynamicPage from './barLoginPages/DynamicPage'; 

function App() {
  return (
    <Router>
      <div className="App">
        <div className="page-content">
          <Routes>
            <Route path="/" element={<NavigatePage />} />
            <Route path="/FirstPageDateOrFrinde" element={<FirstPageDateOrFrinde />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/BarTable" element={<BarTable />} />
            <Route path="/NotInBar" element={<NotInBar />} />
            <Route path="/TheRustyAnchor" element={<TheRustyAnchor />} />
            <Route path="/LogoPage" element={<AnimatedLogo />} />
            <Route path="/BackToGame" element={<BackToGame />} />
            <Route path="/HomePageForDates" element={<HomePageForDates />} />
            <Route path="/HomePageForFriends" element={<HomePageForFriends />} />
            <Route path="/ChooseDate" element={<ChooseDate />} />
            <Route path="/ChooseFrindes" element={<ChooseFrindes />} />
            <Route path="/DateGame" element={<DateGame />} />
            <Route path="/FrindesGame" element={<FrindesGame />} />
            <Route path="/WaitingForApproval" element={<WaitingForApproval />} />
            <Route path="/AddQuestion" element={<AddQuestion />} />
            <Route path="/AddBar" element={<AddBar />} />
            <Route path="/AddPackage" element={<AddPackage />} />
            <Route path="/Instruction" element={<Instruction />} />
            <Route path="/GuessWhatIAm" element={<GuessWhatIAm />} />
            {/* Catch-all route for dynamic paths */}
            <Route path="*" element={<DynamicPage />} />
          </Routes>
        </div>
        <h1 className="graffiti-headline">Get Loose</h1>
      </div>
    </Router>
  );
}

export default App;

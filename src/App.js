import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageForDates from './pages/HomePageForDates';
import HomePageForFriends from './pages/HomePageForFrindes'; 
import FirstPageDateOrFrinde from './pages/FirstPageDateOrFrinde';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="graffiti-headline">Get Loose</h1>
        <Routes>
          <Route path="/" element={<FirstPageDateOrFrinde />} />
          <Route path="/HomePageForDates" element={<HomePageForDates />} />
          <Route path="/HomePageForFriends" element={<HomePageForFriends />} />
          <Route path="/page1" element={<FirstPageDateOrFrinde />} />
          <Route path="/page2" element={<FirstPageDateOrFrinde />} />
          <Route path="/page3" element={<FirstPageDateOrFrinde />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

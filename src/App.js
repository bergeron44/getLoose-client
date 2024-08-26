import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePageForDates from './pages/HomePageForDates';
import HomePageForFrindes from './pages/HomePageForFrindes';
import FirstPageDateOrFrinde from './pages/FirstPageDateOrFrinde';

// All other imports...

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstPageDateOrFrinde />} />
          <Route path="/HomePageForDates" element={<HomePageForDates />} />
          <Route path="/HomePageForFrindes" element={<HomePageForFrindes />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

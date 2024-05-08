import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from './pages/HomePage'
import InstructinsPage from './pages/InstructinsPage';
import SuggestionPage from './pages/SuggestionPage';
import AddQuestionPage from './pages/AddQuestionPage';
import FeedbackPage from './pages/FeedbackPage'; 
import AddCategoryPage from './pages/AddCategoryPage';
import NewCategoryPage from './pages/NewCategoryPage';
import EnterUserName from './pages/EnterUserName';
import NewQuestionPage from './pages/NewQuestionPage';

//all i want
function App() {
return (
  
  <Router>
    <div className="App">
      {/* if you want header component to be with all the pages add it exactly here! */}
      <Routes>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/gameInstructins" element={<InstructinsPage/>}/>
         <Route path="/gameSuggestion" element={<SuggestionPage/>}/>
         <Route path="/enterUserName" element={<EnterUserName/>}/>
         <Route path="/gameNewCategory" element={<NewCategoryPage/>}/>
         <Route path="/gameNewQuestion" element={<NewQuestionPage/>}/>
         <Route path="/gameFeedback" element={<FeedbackPage/>}/>
         <Route path="/gameAddQuestion" element={<AddQuestionPage/>}/>
         <Route path="/gameAddCategory" element={<AddCategoryPage/>}/>
       
        
       </Routes>
     
             {/* if you want footer component to be with all the pages add it exactly here! */}
       </div>
    </Router>
  );
}

export default App;

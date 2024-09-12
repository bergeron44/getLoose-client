import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../TestFeedBack.css'; // Ensure to add CSS for this page

const DateUpdateQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  //const [gameType] = useState('Date'); // Fixed game type for this component
  const [gameType] = useState('Friends');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://getloose-server.onrender.com/api/questions');
        setQuestions(response.data);
        filterAndShuffleQuestions(response.data, gameType);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [gameType]);

  const filterAndShuffleQuestions = (allQuestions, type) => {
    const filtered = allQuestions.filter(q => q.game === type);
    const shuffled = shuffleArray(filtered);
    setFilteredQuestions(shuffled);
  };

  // Function to shuffle the array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleUpdateQuestion = async () => {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    try {
      console.log(currentQuestion._id);
      const p=await axios.put(`https://getloose-server.onrender.com/api/questions/update/${currentQuestion._id}`, {
        question: newQuestion
      });
      console.log(p);
      const updatedQuestions = [...filteredQuestions];
      updatedQuestions[currentQuestionIndex].question = newQuestion;
      setFilteredQuestions(updatedQuestions);
      setNewQuestion('');
    } catch (error) {
      console.error('Failed to update question:', error);
      setError(error.message || 'An error occurred while updating the question');
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % filteredQuestions.length);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const gameName = currentQuestion?.game === "Date" ? "משחק הדייטים" : "Do Or Drink";

  return (
    <div className="test-feedback">
      <h1 className="game-title">
        :המשחק<br/>
        "{gameName || 'Loading...'}"<br/><br/>
        עדכן את השאלה הבאה
      </h1>
      {currentQuestion ? (
        <>
          <div className="question-section">
            <p>"{currentQuestion.question}"</p>
            <div className="update-section">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter new question"
              /><br/> <br/>
              <button onClick={handleUpdateQuestion}>Update Question</button>
            </div>
          </div>
          <button onClick={handleNext} disabled={!currentQuestion} className="next-button">
            שאלה הבאה
          </button>
        </>
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
};

export default DateUpdateQuestions;

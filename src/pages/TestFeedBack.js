import React, { useEffect, useState } from 'react';
import Feedback from '../components/Feedback'; // Adjust the path as needed
import { useDispatch } from 'react-redux';
import { updateQuestionRate } from '../store/actions/questionsActions';
import axios from 'axios';
import './TestFeedBack.css'; // Ensure to add CSS for this page

const TestFeedback = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Use Redux dispatch
  var gameName = "";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://getloose-server.onrender.com/api/questions');
        
        // Shuffle questions after fetching
        const shuffledQuestions = shuffleArray(response.data);
        setQuestions(shuffledQuestions);
        
        console.log("Fetched and shuffled questions:", shuffledQuestions);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Function to shuffle the array
  const shuffleArray = (array) => {
    console.log("Shuffling questions array");
    return array.sort(() => Math.random() - 0.5);
  };

  const handleRate = (rating) => {
    const currentQuestion = questions[currentQuestionIndex];
    console.log("This is the current question before update: ", currentQuestion);
    console.log("This is the rating given: ", rating);
    console.log("This is the current question's score: ", currentQuestion.appearance * currentQuestion.rate);

    var newRating = (rating + currentQuestion.appearance * currentQuestion.rate) / (currentQuestion.appearance + 1);
    console.log("This is the new average rating: ", newRating);

    if (currentQuestion.appearance === 0 || currentQuestion.appearance == null || currentQuestion.rate > 5) {
      newRating = rating;
      console.log("New rating adjusted due to initial conditions: ", newRating);
    }

    // Dispatch the updateQuestionRate action
    dispatch(updateQuestionRate(currentQuestion._id, newRating, currentQuestion.appearance + 1));

    // Update local state
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].rate = newRating;
    setQuestions(updatedQuestions);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    console.log("Moved to next question, current index:", currentQuestionIndex);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const currentQuestion = questions[currentQuestionIndex];
  
  if (currentQuestion?.game === "Date") {
    gameName = "משחק הדייטים";
  } else {
    gameName = "Do Or Drink";
  }
  
  return (
    <div className="test-feedback">
      <h1 className="game-title">
        נשמח לדקה מזמנכם לדרג את השאלות
        <br/><br/>
        :המשחק<br/>"{gameName || 'Loading...'}"
        <br/><br/>
        מה אתם חושבים על השאלה הבאה
      </h1>
      {currentQuestion ? (
        <>
          <Feedback
            question={currentQuestion}
            onRate={handleRate}
            onNext={handleNext}
          />
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

export default TestFeedback;

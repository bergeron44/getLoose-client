import React, { useState, useEffect } from 'react';
import './GuessWhatIAm.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGuessWhatIAmQuestions } from '../../store/actions/questionsActions';

const GuessWhatIAm = () => {
  const dispatch = useDispatch();
  const [difficulty, setDifficulty] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [timer, setTimer] = useState(10);
  const [lives, setLives] = useState(2);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [showPrompt, setShowPrompt] = useState(true); // New state for the prompt

  const guessQuestions = useSelector(state => state.questions.guesswhatiamQuestions);

  useEffect(() => {
    if (difficulty) {
      dispatch(fetchGuessWhatIAmQuestions(difficulty));
    }
  }, [difficulty, dispatch]);

  useEffect(() => {
    if (guessQuestions && guessQuestions.length > 0) {
      if (currentQuestionIndex === null) {
        selectNextQuestion();
      }
    }
  }, [guessQuestions]);

  useEffect(() => {
    let countdown;
    if (timer > 0 && !showAnswerInput && !showPrompt) {
      countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && !showAnswerInput && !showPrompt) {
      handleTimerEnd();
    }
    return () => clearInterval(countdown);
  }, [timer, showAnswerInput, showPrompt]);

  useEffect(() => {
    if (showPrompt) {
      const promptTimer = setTimeout(() => {
        setShowPrompt(false);
        setTimer(10); // Start the timer after the prompt
      }, 2000); // Show the prompt for 2 seconds

      return () => clearTimeout(promptTimer);
    }
  }, [showPrompt]);

  const handleTimerEnd = () => {
    setShowAnswerInput(true);
    setMessage('אני רוצה מישהו אחר ');
  };

  const handleGuess = () => {
    const currentQuestion = getCurrentQuestion();
    if (userGuess.toLowerCase() === currentQuestion.question.toLowerCase()) {
      setMessage('Correct! Well done!');
      setWrongAttempts(0);
      setTimeout(() => selectNextQuestion(), 3000); // Wait 2 seconds before loading next question
    } else {
      setMessage(`טעות  ${wrongAttempts >= 1 ? `התשובה הנכונה היא: ${currentQuestion.question}.הורד  ${currentQuestion.punishment} ` : 'ותנסה שוב'}`);
      setLives(prev => prev - 1);
      setWrongAttempts(prev => prev + 1);
      if (lives <= 0) {
        setGameOver(true);
      }
    }
    setUserGuess('');
  };

  const selectNextQuestion = () => {
    if (!gameOver) {
      let availableQuestions = guessQuestions.filter((_, index) => !usedQuestions.has(index));
      if (availableQuestions.length === 0) {
        setMessage('No more questions available. Game Over!');
        setGameOver(true);
        return;
      }

      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const selectedQuestion = availableQuestions[randomIndex];
      const selectedIndex = guessQuestions.indexOf(selectedQuestion);

      setCurrentQuestionIndex(selectedIndex);
      setUsedQuestions(prev => new Set(prev).add(selectedIndex));
      setShowPrompt(true); // Show prompt for the next question
      setShowAnswerInput(false);
      setMessage('');
    } else {
      setDifficulty(null);
      setLives(2);
      setGameOver(false);
      setCurrentQuestionIndex(null);
      setUsedQuestions(new Set());
      dispatch(fetchGuessWhatIAmQuestions(difficulty));
    }
  };

  const handleRefresh = () => {
    selectNextQuestion();
  };

  const getCurrentQuestion = () => {
    return guessQuestions[currentQuestionIndex] || {};
  };

  const handleNextQuestion = () => {
    selectNextQuestion();
  };

  if (!difficulty) {
    return (
      <div className="difficulty-selection">
        <button onClick={() => setDifficulty('Easy')}>Easy</button>
        <button onClick={() => setDifficulty('Medium')}>Medium</button>
        <button onClick={() => setDifficulty('Hard')}>Hard</button>
      </div>
    );
  }

  return (
    <div className="guess-page">
      {showPrompt && (
        <div className="prompt-message">
          <h2>!תסובב את הטלפון מהר!</h2>
        </div>
      )}
      {!showPrompt && (
        <div>
          {timer > 0 && !showAnswerInput && (
            <div>
              <div className="title">{getCurrentQuestion().question}</div>
              <div className="timer">Time Left: {timer}s</div>
              <img src={'/images/' + getCurrentQuestion().questionImage} alt="Guess What I Am" />
            </div>
          )}
          {showAnswerInput && (
            <div>
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Enter your guess"
                className="guess-input"
              />
              <button onClick={handleGuess} className="submit-button">Submit</button><br/><br/>
            </div>
          )}
          {message && (
            <div className="result-message">
              <h2>{message}</h2>
              {gameOver ? (
                <button onClick={handleNextQuestion}>Try Again</button>
              ) : (
                <button onClick={handleNextQuestion}>🔄</button>
              )}
            </div>
          )}
          {gameOver && (
            <div className="game-over">
              <h2>Game Over</h2>
              <img src={'/images/p3.jpeg'} alt="Goddess" className="goddess-image" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GuessWhatIAm;

// src/components/Feedback.js
import React, { useState } from 'react';
import './Feedback.css'; // Ensure this path is correct

const Feedback = ({ question, onRate, onNext }) => {
  const [rating, setRating] = useState(question.rate);

  const handleSliderChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleSubmit = () => {
    onRate(rating);
    onNext();
  };

  return (
    <div className="feedback-container">
      <div className="feedback-question">{question.question}</div>
      <div className="feedback-rating-container">
        <label className="feedback-rating-label" htmlFor="rating">Rate:</label>
        <input
          type="range"
          id="rating"
          min="1"
          max="5"
          step="1"
          value={rating}
          onChange={handleSliderChange}
          className="feedback-rating-slider"
        />
        <span>{rating}</span>
      </div>
      <button onClick={handleSubmit} className="feedback-submit-button">
        Submit
      </button>
    </div>
  );
};

export default Feedback;
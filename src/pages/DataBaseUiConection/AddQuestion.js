import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../../store/actions/questionsActions';
import './AddQuestion.css'; // Import the CSS file

const AddQuestion = () => {
    const dispatch = useDispatch();
    const [questionData, setQuestionData] = useState({
        category: '',
        game: '',
        difficult: '',
        question: '',
        questionEnglish:'',
        punishment: '',
        punishmentEnglish:'',
        questionImage:'',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setQuestionData({
            ...questionData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields are filled
        const { category, game, difficult, question, questionEnglish, punishment, punishmentEnglish, questionImage } = questionData;
        if (!category || !game || !difficult || !question || !questionEnglish || !punishment || !punishmentEnglish|| !questionImage) {
            setError('Please fill out all fields');
            return;
        }

        // Clear any existing errors
        setError('');

        // Dispatch the addQuestion action
        dispatch(addQuestion(questionData));

        // Optionally, clear the form after submission
        setQuestionData({
            category: '',
            game: '',
            difficult: '',
            question: '',
            questionEnglish:'',
            punishment: '',
            punishmentEnglish:'',
            questionImage:'',
        });
    };

    return (
        <div className="add-question-container">
            <h1 className="add-question-title">Add New Question</h1>
            {error && <p className="add-question-error">{error}</p>}
            <form onSubmit={handleSubmit} className="add-question-form">
            <button type="submit" className="add-question-button">
                    Add Question
                </button>
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={questionData.category}
                    onChange={handleChange}
                    required
                    className="add-question-field-category"
                >
                    <option value="">Select a category</option>
                    <option value="Never-Have-I-Ever">Never-Have-I-Ever</option>
                    <option value="Tell-Me-A-Secret">Tell-Me-A-Secret</option>
                    <option value="Truth">Truth</option>
                    <option value="Dare">Dare</option>
                    <option value="books">books</option>
                    <option value="movie">movie</option>
                    <option value="music">music</option>
                    <option value="sports">sports</option>
                    <option value="science">science</option>
                    <option value="politics">politics</option>
                    <option value="literature">literature</option>
                    <option value="technology">technology</option>
                    <option value="cartoon">cartoon</option>
                    {/* Add more categories as needed */}
                </select>
                
                <label htmlFor="game">Game</label>
                <select
                    id="game"
                    name="game"
                    value={questionData.game}
                    onChange={handleChange}
                    required
                    className="add-question-field-game"
                >
                    <option value="">Select a game</option>
                    <option value="Date">Date</option>
                    <option value="Friends">Friends</option>
                    <option value="Guess-What-I-Am">Guess-What-I-Am</option>
                    {/* Add more game types as needed */}
                </select>
                
                <label htmlFor="difficult">Difficulty</label>
                <select
                    id="difficult"
                    name="difficult"
                    value={questionData.difficult}
                    onChange={handleChange}
                    required
                    className="add-question-field-difficult"
                >
                    <option value="">Select difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                
                <label htmlFor="question">Question</label>
                <input
                    id="question"
                    name="question"
                    type="text"
                    value={questionData.question}
                    onChange={handleChange}
                    required
                    className="add-question-field-question"
                />
                
                <label htmlFor="questionEnglish">Question (English)</label>
                <input
                    id="questionEnglish"
                    name="questionEnglish"
                    type="text"
                    value={questionData.questionEnglish}
                    onChange={handleChange}
                    required
                    className="add-question-field-questionEnglish"
                />
                
                <label htmlFor="punishment">Punishment</label>
                <input
                    id="punishment"
                    name="punishment"
                    type="text"
                    value={questionData.punishment}
                    onChange={handleChange}
                    required
                    className="add-question-field-punishment"
                />
                
                <label htmlFor="punishmentEnglish">Punishment (English)</label>
                <input
                    id="punishmentEnglish"
                    name="punishmentEnglish"
                    type="text"
                    value={questionData.punishmentEnglish}
                    onChange={handleChange}
                    required
                    className="add-question-field-punishmentEnglish"
                />
                 <label htmlFor="questionImage">question Image</label>
                <input
                    id="questionImage"
                    name="questionImage"
                    type="text"
                    value={questionData.questionImage}
                    onChange={handleChange}
                    required
                    className="add-question-field-questionImage"
                />
                
            </form>
        </div>
    );
};

export default AddQuestion;

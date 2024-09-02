import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import { addQuestion } from '../../store/actions/questionsActions';
import './AddQuestion.css'; // Import the CSS file

const AddQuestion = () => {
    const dispatch = useDispatch();
    const [questionData, setQuestionData] = useState({
        category: '',
        game: '',
        difficult: '',
        question: '',
        punishment: '',
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
        const { category, game, difficult, question, punishment } = questionData;
        if (!category || !game || !difficult || !question || !punishment) {
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
            punishment: '',
        });
    };

    return (
        <Box className="add-question-container">
            <Typography className="add-question-title" variant="h4" gutterBottom>
                Add New Question
            </Typography>
            {error && <Typography className="add-question-error">{error}</Typography>}
            <form onSubmit={handleSubmit} className="add-question-form">
                <TextField
                    label="Category"
                    name="category"
                    value={questionData.category}
                    onChange={handleChange}
                    fullWidth
                    select
                    margin="normal"
                    variant="outlined"
                    required
                    className="add-question-field"
                >
                    <MenuItem value="Date">Date</MenuItem>
                    <MenuItem value="Friends">Friends</MenuItem>
                    {/* Add more categories as needed */}
                </TextField>
                <TextField
                    label="Game"
                    name="game"
                    value={questionData.game}
                    onChange={handleChange}
                    fullWidth
                    select
                    margin="normal"
                    variant="outlined"
                    required
                    className="add-question-field"
                >
                    <MenuItem value="Date">Date</MenuItem>
                    <MenuItem value="Friends">Friends</MenuItem>
                    {/* Add more game types as needed */}
                </TextField>
                <TextField
                    label="Difficulty"
                    name="difficult"
                    value={questionData.difficult}
                    onChange={handleChange}
                    fullWidth
                    select
                    margin="normal"
                    variant="outlined"
                    required
                    className="add-question-field"
                >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </TextField>
                <TextField
                    label="Question"
                    name="question"
                    value={questionData.question}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                    className="add-question-field"
                />
                <TextField
                    label="Punishment"
                    name="punishment"
                    value={questionData.punishment}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                    className="add-question-field"
                />
                <Button type="submit" variant="contained" color="primary" className="add-question-button">
                    Add Question
                </Button>
            </form>
        </Box>
    );
};

export default AddQuestion;

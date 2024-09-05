import axios from 'axios';
import {
    UPDATE_QUESTION_USE_SUCCESS,
    UPDATE_DIFFICULTY_SUCCESS,
    REMOVE_QUESTION_SUCCESS,
    ADD_QUESTION_SUCCESS,
    FETCH_GAME_QUESTIONS_SUCCESS,
    FETCH_CATEGORY_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_DATE_QUESTIONS_SUCCESS, // Ensure this is imported if used
    FETCH_FRIENDS_QUESTIONS_SUCCESS
} from '../actionTypes';

// Define the base URL
const BASE_URL = 'https://getloose-server.onrender.com';

// Fetch all questions
export const fetchQuestions = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/questions`);
        dispatch({
            type: FETCH_QUESTIONS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching questions:', error);
        // Optionally dispatch an error action
        // dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch questions by category
export const fetchCategoryQuestions = (categoryName) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/questions/category/${categoryName}`);
        dispatch({
            type: FETCH_CATEGORY_QUESTIONS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching category questions:', error);
        // Optionally dispatch an error action
        // dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch questions by game category
export const fetchGameQuestions = (gameCat) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/questions/game/${gameCat}`);
        dispatch({
            type: FETCH_GAME_QUESTIONS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching game questions:', error);
        // Optionally dispatch an error action
        // dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Add a new question
export const addQuestion = (questionData) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/questions`, questionData);
        dispatch({
            type: ADD_QUESTION_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error adding question:', error);
        // Optionally dispatch an error action
        // dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Remove a question
export const removeQuestion = (questionId) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/api/questions/${questionId}`);
        dispatch({
            type: REMOVE_QUESTION_SUCCESS,
            payload: questionId,
        });
    } catch (error) {
        console.error('Error removing question:', error);
        // Optionally dispatch an error action
        // dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Update difficulty of a question
export const updateDifficulty = (difficultyData) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/questions/difficulty`, difficultyData);
        dispatch({
            type: UPDATE_DIFFICULTY_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error updating difficulty:', error);
        // Optionally dispatch an error action
        // dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Update usage of a question
export const updateQuestionUse = (questionId, succeed) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/questions/${questionId}/${succeed}`);
        dispatch({
            type: UPDATE_QUESTION_USE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error updating question use:', error);
        // Optionally dispatch an error action
        // dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch questions by date (if needed)
export const fetchDateQuestions = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/questions/game/Date`);
        console.log(response.data)
        dispatch({
            type: FETCH_DATE_QUESTIONS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching date questions:', error);
        // Optionally dispatch an error action
        // dispatch({ type: SET_ERROR, payload: error.message });
    }
};
export const fetchFriendsQuestions = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/questions/game/Friends`);
        console.log(response.data)
        dispatch({
            type: FETCH_FRIENDS_QUESTIONS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching date questions:', error);
        // Optionally dispatch an error action
        // dispatch({ type: SET_ERROR, payload: error.message });
    }
};


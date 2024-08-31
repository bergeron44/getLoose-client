import {
    FETCH_QUESTIONS_SUCCESS,
    FETCH_CATEGORY_QUESTIONS_SUCCESS,
    FETCH_GAME_QUESTIONS_SUCCESS,
    ADD_QUESTION_SUCCESS,
    REMOVE_QUESTION_SUCCESS,
    UPDATE_DIFFICULTY_SUCCESS,
    UPDATE_QUESTION_USE_SUCCESS,
    FETCH_DATE_QUESTIONS_SUCCESS // Ensure this is imported
} from '../actionTypes';

const initialState = {
    allQuestions: [],
    categoryQuestions: [],
    gameQuestions: [],
    dateQuestions: [], // Ensure this state exists
    currentQuestion: null
};

const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATE_QUESTIONS_SUCCESS:
            return {
                ...state,
                dateQuestions: action.payload
            };
        case FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                allQuestions: action.payload
            };
        case FETCH_CATEGORY_QUESTIONS_SUCCESS:
            return {
                ...state,
                categoryQuestions: action.payload
            };
        case FETCH_GAME_QUESTIONS_SUCCESS:
            return {
                ...state,
                gameQuestions: action.payload
            };
        case ADD_QUESTION_SUCCESS:
            return {
                ...state,
                allQuestions: [...state.allQuestions, action.payload]
            };
        case REMOVE_QUESTION_SUCCESS:
            return {
                ...state,
                allQuestions: state.allQuestions.filter(question => question._id !== action.payload)
            };
        case UPDATE_DIFFICULTY_SUCCESS:
            return {
                ...state,
                allQuestions: state.allQuestions.map(question =>
                    question._id === action.payload._id ? { ...question, difficulty: action.payload.difficulty } : question
                )
            };
        case UPDATE_QUESTION_USE_SUCCESS:
            return {
                ...state,
                allQuestions: state.allQuestions.map(question =>
                    question._id === action.payload._id ? { ...question, usage: action.payload.usage } : question
                )
            };
        default:
            return state;
    }
};

export default questionsReducer;

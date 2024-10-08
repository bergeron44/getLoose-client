import {
    FETCH_QUESTIONS_SUCCESS,
    FETCH_CATEGORY_QUESTIONS_SUCCESS,
    FETCH_GAME_QUESTIONS_SUCCESS,
    ADD_QUESTION_SUCCESS,
    REMOVE_QUESTION_SUCCESS,
    UPDATE_DIFFICULTY_SUCCESS,
    UPDATE_QUESTION_USE_SUCCESS,
    FETCH_DATE_QUESTIONS_SUCCESS, // Ensure this is imported
    FETCH_FRIENDS_QUESTIONS_SUCCESS,
    FETCH_GUESS_WHAT_I_AM_QUESTIONS_SUCCESS,
    UPDATE_QUESTION_RATE_SUCCESS,
} from '../actionTypes';

const initialState = {
    allQuestions: [],
    categoryQuestions: [],
    gameQuestions: [],
    dateQuestions: [], // Ensure this state exists
    friendsQuestions: [],
    guesswhatiamQuestions: [],
    currentQuestion: null
};

const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATE_QUESTIONS_SUCCESS:
            return {
                ...state,
                dateQuestions: action.payload,
                gameQuestions: action.payload,
            };
        case FETCH_FRIENDS_QUESTIONS_SUCCESS:
            return {
                    ...state,
                    gameQuestions: action.payload,
                    friendsQuestions: action.payload,
                };
        case FETCH_GUESS_WHAT_I_AM_QUESTIONS_SUCCESS:
                    return {
                            ...state,
                            gameQuestions: action.payload,
                            guesswhatiamQuestions: action.payload,
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
            case UPDATE_QUESTION_RATE_SUCCESS:
                return {
                    ...state,
                    allQuestions: state.allQuestions.map(question =>
                        question._id === action.payload._id ? { ...question, rate: action.payload.rate } : question
                    )
                };   
        default:
            return state;
    }
};

export default questionsReducer;

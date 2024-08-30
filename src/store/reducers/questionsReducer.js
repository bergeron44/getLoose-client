import { FETCH_DATE_QUESTIONS_SUCCESS } from '../actions/questionsActions';

const initialState = {
    dateQuestions: []
};

const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATE_QUESTIONS_SUCCESS:
            return {
                ...state,
                dateQuestions: action.payload
            };
        default:
            return state;
    }
};

export default questionsReducer;

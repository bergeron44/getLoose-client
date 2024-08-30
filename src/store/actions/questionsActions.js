import axios from 'axios';

export const FETCH_DATE_QUESTIONS_SUCCESS = 'FETCH_DATE_QUESTIONS_SUCCESS';

export const fetchDateQuestions = () => async dispatch => {
    try {
        const response = await axios.get('/api/questions?type=Date');
        dispatch({
            type: FETCH_DATE_QUESTIONS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.error('Error fetching date questions', error);
    }
};
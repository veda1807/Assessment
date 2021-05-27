import isNextReducer from './isNext';
import isSubmitReducer from './isSubmit';
import isResultReducer from './results';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    question : isNextReducer,
    Instructions : isSubmitReducer,
    Results : isResultReducer
});

export default allReducers;
import {combineReducers} from 'redux';
import auth from './auth.reducers';
import nav from './nav.reducers';
import habit from './habit.reducers';

const rootReducer = combineReducers({
  auth, nav, habit
});

export default rootReducer;
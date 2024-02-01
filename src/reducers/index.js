
import { combineReducers } from 'redux';
import postReducer from './reducers';

const rootReducer = combineReducers({
  posts: postReducer,
});

export default rootReducer;

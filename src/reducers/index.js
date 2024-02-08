
import { combineReducers } from 'redux';
import postReducer from './reducers';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer,
  
});

export default rootReducer;

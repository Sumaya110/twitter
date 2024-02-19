import { combineReducers } from "redux";
import postReducer from "./reducers";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer,
  notifications: notificationReducer
});

export default rootReducer;

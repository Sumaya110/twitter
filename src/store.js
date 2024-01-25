import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import modalReducer from './reducers/reducers';


const store = createStore(
    modalReducer, 
    // applyMiddleware(thunk) 
);

export default store;

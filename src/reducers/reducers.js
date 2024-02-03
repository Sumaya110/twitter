const initialState = {
  posts: [],
  users: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;

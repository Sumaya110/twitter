const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
      };
    

      // console.log("uers: ", users)
    default:
      return state;
  }
};

export default postReducer;

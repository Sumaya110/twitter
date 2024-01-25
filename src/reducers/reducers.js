const initialState = {
    isModalOpen: false,
    modalPost: null,
    modalPostId: null
  };
  
  const modalReducer = (state = initialState, action) => {

    // console.log("action type :: ", action.type)
    switch (action.type) {
      case 'OPEN_MODAL':
        return {
          ...state,
          isModalOpen: true,
          modalPost: action.payload.post,
          modalPostId: action.payload.postId
        };
      default:
        return state;
    }
  };
  
  export default modalReducer;
  
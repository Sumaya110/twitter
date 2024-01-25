export const openModal = (post, postId) => {
    return {
      type: 'OPEN_MODAL',
      payload: {
        post,
        postId
      }
    };
  };
  
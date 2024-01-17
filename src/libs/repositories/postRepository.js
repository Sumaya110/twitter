import Posts from "../models/postModel";


const create = async ({ content, imageUrl}) => {
  const post = await Posts.create({ content, imageUrl});
  return post;
};


const PostRepository = {
  create,
};

export default PostRepository;
import Post from "../models/postModel";

const create = async (content ) => {
  console.log("content ", content)
  const post = await Post.create({
    id: content.id,
    username: content.username,
    userImg: content.userImg,
    tag: content.tag,
    text: content.text,
  });
  return post;
};


const findById = async (id) => {
  console.log("idddd  :", id)
  const response = await Post.findById(id);
  return response;
};

const PostRepository = {
  create, findById, 
};

export default PostRepository;

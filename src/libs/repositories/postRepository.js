import Post from "../models/postModel";

const create = async (content ) => {
  const post = await Post.create({
    userId: content.userId,
    username: content.username,
    userImg: content.userImg,
    tag: content.tag,
    text: content.text,
    timestamp: content.timestamp,
    imageUrl: content.imageUrl,
  });
  return post;
};


//.sort({createdAt: -1})
const find = async (userId ) => {
  const response = await Post.find({userId})
  return response;
};

const findById = async (postId ) => {
  const response = await Post.findById({postId});
  return response;
};

const findOneAndUpdate = async (updateData) => {
  // console.log("repo :", updateData)
 
  const response = await Post.findOneAndUpdate(
    { _id: updateData.postId }, 
   updateData.imageUrl,
    { new: true } 
  );
  return response;
};



const PostRepository = {
  create, find, findOneAndUpdate, findById
};

export default PostRepository;

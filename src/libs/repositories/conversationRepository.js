import Conversation from "../models/conversationModel";

const create = async (content) => {
  const conversation = await Conversation.create(content);
  return conversation;
};

const findOne = async (payload) => {
  const conversation = await Conversation.findOne(payload);

  return conversation;
};

// const findOneAndUpdate = async (content) => {
//   const { conversationId, message } = content;
//   const updatedConversation = await Conversation.findOneAndUpdate(
//     { _id: conversationId },
//     { $push: { messages: message } },
//     { new: true }
//   );
//   return updatedConversation;
// };


const findOneAndUpdate = async ({query, update}) => {
  const updatedConversation = await Conversation.findOneAndUpdate(query, update,  { new: true });
  return updatedConversation;
};

const ConversationRepository = {
  create,
  findOne,
  findOneAndUpdate,
};

export default ConversationRepository;

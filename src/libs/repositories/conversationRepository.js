import Conversation from "../models/conversationModel";

const create = async (content) => {
  const conversation = await Conversation.create(content);
  return conversation;
};

const findOne = async (payload) => {
  const conversation = await Conversation.findOne(payload);
  return conversation;
};

const find = async () => {
  const conversation = await Conversation.find();
  return conversation;
};

const findOneAndUpdate = async ({ query, update }) => {
  const updatedConversation = await Conversation.findOneAndUpdate(
    query,
    update,
    { new: true }
  );
  return updatedConversation;
};

const ConversationRepository = {
  create,
  findOne,
  find,
  findOneAndUpdate,
};

export default ConversationRepository;

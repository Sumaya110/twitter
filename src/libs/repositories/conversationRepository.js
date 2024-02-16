import Conversation from "../models/conversationModel";


const create = async (content) => {
  const conversation = await Conversation.create(content);
  return conversation;
};

const findOne = async (payload) => {
  const conversation = await Conversation.findOne(payload);
  return conversation;
};

const ConversationRepository = {
    create,findOne,
    
  };
  
  export default ConversationRepository;
  
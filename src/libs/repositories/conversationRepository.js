import Conversation from "../models/conversationModel";


const create = async (content) => {
  const conversation = await Conversation.create(content);
  return conversation;
};



const ConversationRepository = {
    create,
    
  };
  
  export default ConversationRepository;
  
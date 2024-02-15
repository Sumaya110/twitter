import ConversationRepository from "../repositories/conversationRepository";

export const createConversation = async (req, res) => {
  try {
    const response = await ConversationRepository.create(req.body);
    return res.status(200).json(response._id);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
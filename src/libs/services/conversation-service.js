import ConversationRepository from "../repositories/conversationRepository";

export const createConversation = async (req, res) => {
  try {
    const response = await ConversationRepository.create(req.body);
    return res.status(200).json(response._id);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getConversation = async (req, res) => {
  const userOneId = req.query.params[0];
  const userTwoId = req.query.params[1];

  try {
    const response = await ConversationRepository.findOne({
      $or: [
        { userOneId, userTwoId },
        { userOneId: userTwoId, userTwoId: userOneId },
      ],
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

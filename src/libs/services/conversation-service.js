import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import ConversationRepository from "../repositories/conversationRepository";

export const createConversation = async (req, res) => {
  try {
    const userOneId = req.body.userOneId;
    const userTwoId = req.body.userTwoId;

    var response = null;
    response = await ConversationRepository.findOne({
      $or: [
        { userOneId, userTwoId },
        { userOneId: userTwoId, userTwoId: userOneId },
      ],
    });

    if (!response) response = await ConversationRepository.create(req.body);

    return res.status(200).json(response._id);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversationId = req.query.conversationId;
    const response = await ConversationRepository.findOne({
      _id: conversationId,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getConversations = async (req, res) => {
  try {
    const response = await ConversationRepository.find();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateConversation = async (data) => {
  await connectMongo();
  try {
    const conversationId = data.conversationId;
    const messages = data.message;

    const response = await ConversationRepository.findOneAndUpdate({
      query: { _id: conversationId },
      update: { $push: { messages } },
    });

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};

export const markSeen = async (req, res) => {
  try {
    const { conversationId, messageIds } = req.body;
    const response = await ConversationRepository.findOneAndUpdate({
      query: { _id: conversationId, "messages._id": { $in: messageIds } },
      update: { $set: { "messages.$[].seen": true } },
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const markAsSeen = async ({ conversationId, messageIds }) => {
  const response = await ConversationRepository.findOneAndUpdate({
    query: { _id: conversationId, "messages._id": { $in: messageIds } },
    update: { $set: { "messages.$[].seen": true } },
  });
  return response;
};

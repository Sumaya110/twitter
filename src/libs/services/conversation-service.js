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

// export const updateConversation = async (data) =>{
//   try{
//       const response = await ConversationRepository.findOneAndUpdate(data);
//       return response;
//   } catch(error){
//       throw Error(error.message)
//   }
// }

// { _id: conversationId },
//     { $push: { messages: message } },
//     { new: true }
// markSeen

export const updateConversation = async (data) => {
  console.log("service  ::!! ", data);
  try {
    const conversationId = data.conversationId;
    const messages = data.message;

    const response = await ConversationRepository.findOneAndUpdate(
      { _id: conversationId },
      { $push: { messages } },
      { new: true }
    );

    console.log("jhj : ", response)
    return response;
  } catch (error) {
    throw Error(error.message);
    // console.log("errr")
  }
};

export const markSeen = async (req, res) => {
  try {
    const response = await ConversationRepository.findOneAndUpdate(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

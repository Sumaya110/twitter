//const mongoose = require('mongoose')
import Message from "./subModel/messageModel";
import { Schema, model, models } from "mongoose";


const conversationSchema = new Schema({
  userOneId: {
    type: String,
    required: true,
  },

  userTwoId: {
    type: String,
    required: true,
  },

  message: [Message],
});

const Conversation =
  models?.Conversation ||
  model("Conversation", conversationSchema);

// module.exports = Conversation;
export default Conversation
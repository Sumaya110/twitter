import messageSchema from "./subModel/messageModel";
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

  messages: [messageSchema],
});

const Conversation =
  models?.Conversation || model("Conversation", conversationSchema);

export default Conversation;

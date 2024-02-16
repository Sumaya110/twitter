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

  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

const Conversation =
  models?.Conversation ||
  model("Conversation", conversationSchema);


export default Conversation
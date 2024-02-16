import { Schema, model, models } from "mongoose";


const messageSchema = Schema({
  senderId: {
    type: String,
    required: true,
  },

  receiverId: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },
});


const Message =  models?.Message || model("Message", messageSchema); 

export default Message;
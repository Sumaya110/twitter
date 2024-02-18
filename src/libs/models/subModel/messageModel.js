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

  seen: {
    type: Boolean,
    default: false,
    
  },
});

module.exports = messageSchema
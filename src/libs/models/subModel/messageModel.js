const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
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


module.exports = Message;

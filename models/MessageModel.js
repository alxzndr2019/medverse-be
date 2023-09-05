const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatsession: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  content: {
    type: String,
  },
  sender: {
    type: String,
    enum: ["USER", "DOCTOR"],
    required: true,
  },
});

const Chat = mongoose.model("Message", messageSchema);
module.exports = Chat;

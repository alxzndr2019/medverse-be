const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  prescription: { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  diagnosis: { type: mongoose.Schema.Types.ObjectId, ref: "Diagnosis" },
  //   sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
});

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;

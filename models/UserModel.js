const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
  prescriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;

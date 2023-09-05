const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
});

const Session = mongoose.model("Hospital", hospitalSchema);
module.exports = Session;

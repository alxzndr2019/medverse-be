const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  diagnosis: { type: String },
  session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
});

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);
module.exports = Diagnosis;

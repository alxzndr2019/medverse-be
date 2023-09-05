const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  drugs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Drug" }],
  session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;

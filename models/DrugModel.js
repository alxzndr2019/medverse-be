const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema({
  drugName: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  prescription: { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
});

const Drug = mongoose.model("Drug", drugSchema);
module.exports = Drug;

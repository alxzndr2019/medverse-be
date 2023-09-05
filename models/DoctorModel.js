const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
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
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;

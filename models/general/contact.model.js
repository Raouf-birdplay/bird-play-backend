const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true, maxLength: 150 },
    email: { type: String, required: true, maxLength: 150 },
    name: { type: String, required: true, maxLength: 100 },
    details: { type: String, required: true, maxLength: 280 },
  },
  { timestamps: true, versionKey: false }
);

const contactModel = mongoose.model("contact", contactSchema);
module.exports = { contactModel };

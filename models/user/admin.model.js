const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 80, minLength: 2 },
    email: { type: String, required: true, unique: true, maxLength: 150 },
    password: { type: String, required: true, minLength: 8, maxLength: 80 },
    mobile: { type: Number, min: 1000000000, max: 9999999999 },
    profileUrl: String,
    bio: {
      type: String,
      minLength: 2,
      maxLength: 250,
    },
    age: Number,
    role: {
      type: String,
      enum: ["admin", "tutor"],
      default: "tutor",
      required: true,
    },
    courses: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "course",
        },
        enrollment: {
          status: { type: Boolean, default: true },
          reason: { type: String },
          admin: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
          time: { type: Number },
        },
      },
    ],
    access: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastLoginRequest: { type: Number },
    lastResetRequest: { type: Number, default: null },
  },
  { timestamps: true, versionKey: false }
);

const adminModel = mongoose.model("admin", adminSchema);
module.exports = { adminModel };

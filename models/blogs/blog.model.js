const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    image: { type: String , required: true},
    isPinned: { type: Boolean, default: false },
    pinCode: { type: Number, default: 0 },
    noOfComments: { type: Number },
    comments: [
      {
        userName: { type: Boolean, default: true },
        comment: { type: String },
        date: { type: Number },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const blogModel = mongoose.model("blog", blogSchema);
module.exports = { blogModel };

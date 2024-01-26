const express = require("express");
const postRouter = express.Router();
postRouter.use(express.json());
postRouter.use(express.urlencoded({ extended: true }));
const { blogModel } = require("../../models/blogs/blog.model");

//! Get all post data
postRouter.get("/all", async (req, res) => {
  const { page, limit } = req.query;
  try {
    const posts = await blogModel
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select({
        comments: 0,
      });
    res.send({ message: "success", posts });
  } catch (error) {
    res.status(400).send({ message: "error" });
  }
});

// add post
postRouter.post("/add", async (req, res) => {
  try {
    let newPost = new faqModel(req.body);
    await newPost.save();
    res.send({ message: "success", post: newPost });
  } catch (error) {
    res.status(404).send({ message: "error" });
  }
});

//delete admin
// adminRouter.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await adminModel.findByIdAndDelete({ _id: id });
//     res.send({ message: "User Deleted!" });
//   } catch (error) {
//     res.status(400).send({ message: "Error" });
//   }
// });

module.exports = { postRouter };

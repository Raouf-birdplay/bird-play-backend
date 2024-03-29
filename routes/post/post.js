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
      .limit(limit);
    res.send({ message: "success", posts });
  } catch (error) {
    res.status(400).send({ message: "error" });
  }
});

//! get single post
postRouter.get("/details/:id", async (req, res) => {
  try {
    let post = await blogModel.findById(req.params.id);
    res.send({ post });
  } catch (error) {
    res.status(404).send({ message: "error" });
  }
});

// add post
postRouter.post("/add", async (req, res) => {
  try {
    let data = req.body;
    let newPost = new blogModel({ ...data, createdAt: Date.now() });
    await newPost.save();
    res.send({ message: "success", post: newPost });
  } catch (error) {
    res.status(404).send({ message: "error" });
  }
});

postRouter.post("/comment/add/:id", async (req, res) => {
  const { id } = req.params;
  const { userName, comment } = req.body;

  try {
    const post = await blogModel.findById(id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    post.comments.push({
      userName: userName,
      comment,
      date: Date.now(),
    });

    await post.save();

    res.send({ message: "Comment added successfully", post: post.comments });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

// delete post
postRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await blogModel.findByIdAndDelete({ _id: id });
    res.send({ message: "Post Deleted!" });
  } catch (error) {
    res.status(400).send({ message: "Error" });
  }
});

//! update blogs

postRouter.patch("/update/:id", async (req, res) => {
  try {
    let post = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send({ message: "Success", post });
  } catch (error) {
    res.status(404).send({ message: "Error" });
  }
});
module.exports = { postRouter };

const express = require("express");
const adminRouter = express.Router();
adminRouter.use(express.json());
adminRouter.use(express.urlencoded({ extended: true }));
const { adminModel } = require("../../models/user/admin.model");

//! Get all admins data
adminRouter.get("/all/users", async (req, res) => {
  const { page, limit } = req.query;
  try {
    if (page && limit) {
      const totalAdmins = await adminModel.countDocuments({});
      const admins = await adminModel
        .find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select({
          password: 0,
          courses: 0,
        });
      res.send({ message: "Success", admins, totalAdmins });
    } else {
      // Retrieve all administrators
      const admins = await adminModel.find().sort({ createdAt: -1 }).select({
        password: 0,
        courses: 0,
      });
      res.send({ message: "Success", admins });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

//delete admin
adminRouter.delete(
  "/delete/:id",
  async (req, res) => {
    const { id } = req.params;
    try {
      await adminModel.findByIdAndDelete({ _id: id });
      res.send({ message: "User Deleted!" });
    } catch (error) {
      res.status(400).send({ message: "Error" });
    }
  }
);

module.exports = { adminRouter };

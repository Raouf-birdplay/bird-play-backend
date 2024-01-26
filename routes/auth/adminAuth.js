require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { adminModel } = require("../../models/user/admin.model");
const { dataSanitizer } = require("../../utils/domSanitizer");
const secret = process.env.jwtSecret;
const adminAuthRouter = express.Router();
adminAuthRouter.use(express.json());
adminAuthRouter.use(express.urlencoded({ extended: true }));

//!admin login
adminAuthRouter.post("/admin/login", async (req, res) => {
  const sanitizedData = dataSanitizer(req.body);
  if (!sanitizedData) {
    return res.status(400).send({ message: "Invalid inputs" });
  }
  const email = sanitizedData.email;
  const password = sanitizedData.password;

  try {
    const admin = await adminModel.findOne({ email });
    if (admin) {
      if (!admin.access) {
        return res.status(401).send({ message: "Access denied" });
      }
      bcrypt.compare(password, admin.password, (err, result) => {
        if (err) {
          res.status(500).send({ message: "Internal server error" });
        }
        if (result) {
          let token = jwt.sign({ email: admin.email, id: admin._id }, secret, {
            expiresIn: "7d",
          });
          return res.send({
            message: "Login successful",
            token,
            user: { ...admin._doc, password: "" },
          });
        } else {
          res.status(401).send({ message: "Wrong credentials" });
        }
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = { adminAuthRouter };

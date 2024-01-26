const express = require("express");
const { contactModel } = require("../../models/general/contact.model");
const { dataSanitizer } = require("../../utils/domSanitizer");
const validator = require("validator");
const contactRouter = express.Router();

//! Get contacts
contactRouter.get("/", async (req, res) => {
  try {
    let contacts = await contactModel.find().sort({ createdAt: -1 });
    res.send({ contacts });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

//! Post contacts
contactRouter.post("/", async (req, res) => {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).send({ message: "Invalid inputs" });
  }
  let sanitizedData = dataSanitizer(req.body);
  if (!sanitizedData) {
    return res.status(400).send({ message: "Invalid inputs" });
  }
  try {
    let newContact = new contactModel(sanitizedData);
    await newContact.save();
    res.send({
      message: "Your request has been submitted. We will contact you soon",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

//!delete the contact
contactRouter.delete(
  "/delete/:id",
  async (req, res) => {
    try {
      await contactModel.findByIdAndDelete(req.params.id);
      res.send({ message: "The contact has been deleted" });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

module.exports = { contactRouter };

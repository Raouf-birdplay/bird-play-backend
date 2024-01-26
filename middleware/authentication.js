const jwt = require("jsonwebtoken");
const { studentModel } = require("../models/user/student.model");
const isAuthenticated = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.jwtSecret, async (err, decoded) => {
      if (decoded) {
        try {
          const student = await studentModel.findById(decoded.id);
          if (student._id && student.access) {
            req.user = student;
            next();
          } else {
            res
              .status(401)
              .send({ message: "Access revoked. Please contact the admin" });
          }
        } catch (error) {
          res.status(500).send({ message: "Internal server error" });
        }
      }
      if (err) {
        res.status(404).send({ message: "Jwt error" });
      }
    });
  } else {
    res.status(404).send({ message: "Jwt error" });
  }
};

module.exports = {
  isAuthenticated,
};

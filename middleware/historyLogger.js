const { historyModel } = require("../models/logs/historylogs.model");

const historyLogger = async (req, res, next) => {
  try {
    // Allow the route handler to process the request
    await next();
    const { _id, role, name } = req.user;
    const { action, type } = req.userAction;
    // Store the information in the MongoDB database
    await historyModel.create({
      userId: _id,
      userName: name,
      action,
      type,
      status:
        res.statusCode >= 200 && res.statusCode < 300 ? "success" : "failure",
      userRole: role,
    });
  } catch (error) {
    console.error("Error in API logging middleware:", error);
    next(error);
  }
};

module.exports = historyLogger;

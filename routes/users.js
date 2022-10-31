const express = require("express");
const { ctrUsers } = require("../controllers");
// const { contactValidation } = require("../../middlewares");
const { errorHandler } = require("../middlewares");
const router = express.Router();

// const { validationMiddleware } = contactValidation;

router.get("/:userID/", errorHandler(ctrUsers.getUser));

module.exports = router;

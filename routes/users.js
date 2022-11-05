const express = require("express");
const { ctrUsers } = require("../controllers");
const { errorHandler } = require("../middlewares");
const router = express.Router();

router.get("/:userID", errorHandler(ctrUsers.getUser));

module.exports = router;

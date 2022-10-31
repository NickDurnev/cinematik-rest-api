const { User } = require("../models");

const findByID = async (id) => await User.findById({ _id: id });

module.exports = { findByID };

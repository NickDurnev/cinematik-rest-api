const { dbUsers } = require("../db");
const isValid = require("mongoose").Types.ObjectId.isValid;

const getUserByID = async (id) => {
  if (!isValid(id)) return false;
  return await dbUsers.findByID(id);
};

module.exports = { getUserByID };

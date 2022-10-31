const { userService } = require("../service");

const getUser = async (req, res, next) => {
  const { userID } = req.params;
  const user = await userService.getUserByID(userID);
  if (user) {
    res.json({
      status: "success",
      data: {
        user: user,
      },
    });
  } else {
    next();
  }
};

module.exports = { getUser };

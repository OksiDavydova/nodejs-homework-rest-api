const { User } = require("../../model");

const findByVerifyToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

module.exports = findByVerifyToken;

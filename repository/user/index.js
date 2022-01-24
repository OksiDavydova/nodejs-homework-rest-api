const findById = require("./findById");
const findByEmail = require("./findByEmail");
const createUser = require("./createUser");
const updateToken = require("./updateToken");
const updateAvatar = require("./updateAvatar");
const findByVerifyToken = require("./findByVerifyToken");
const updateVerify = require("./updateVerify");

module.exports = {
  findById,
  findByEmail,
  createUser,
  updateToken,
  updateAvatar,
  findByVerifyToken,
  updateVerify,
};

const registration = require("./registration");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./currentUser");
const uploadAvatar = require("./uploadAvatar");
const verifyUser = require("./verifyUser");
const repeatEmailForVerifyUser = require("./repeatEmailForVerifyUser");

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
};

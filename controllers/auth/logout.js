const { HttpCode } = require("../../utils");
const { AuthService } = require("../../service");

const logout = async (req, res, next) => {
  await AuthService.setToken(req.user.id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

module.exports = logout;

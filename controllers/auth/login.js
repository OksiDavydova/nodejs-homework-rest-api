const { HttpCode, MESSAGES } = require("../../utils");
const { AuthService } = require("../../service");
const { CustomError } = require("../../helpers");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await AuthService.getUser(email, password);

  if (!user) {
    throw new CustomError(HttpCode.UNAUTHORIZED, MESSAGES.InvalidCred);
  }

  const token = AuthService.getToken(user);
  await AuthService.setToken(user.id, token);

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { token },
  });
};
module.exports = login;

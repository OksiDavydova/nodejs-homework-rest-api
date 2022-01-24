const { HttpCode } = require("../../utils");
const {
  userMethod: { findByVerifyToken, updateVerify },
} = require("../../repository");

const verifyUser = async (req, res, next) => {
  const verificationToken = req.params.token;
  const candidateFromToken = await findByVerifyToken(verificationToken);

  if (candidateFromToken) {
    await updateVerify(candidateFromToken.id, true);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: "success",
    });
  }

  res.status(HttpCode.BAD_REQUEST).json({
    status: "success",
    code: HttpCode.BAD_REQUEST,
    message: "Invalid token",
  });
};

module.exports = verifyUser;

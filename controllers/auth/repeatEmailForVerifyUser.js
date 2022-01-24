const { HttpCode, MESSAGES } = require("../../utils");
const {
  userMethod: { findByEmail },
} = require("../../repository");
const {
  Email: { EmailService, SenderNodemailer },
} = require("../../service");

const { CustomError } = require("../../helpers");

// ===============================

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await findByEmail(email);

  if (!user) {
    throw new CustomError(
      HttpCode.NOT_FOUND,
      `User with email: ${email} - not found`
    );
  }

  if (user.verify) {
    throw new CustomError(
      HttpCode.CONFLICT,
      `User with email: ${email} - has already had verification`
    );
  }

  const repeatEmailService = new EmailService(
    process.env.NODE_ENV,
    new SenderNodemailer()
  );

  const isSend = await repeatEmailService.sendVerifyEmail(
    email,
    user.name,
    user.verificationToken
  );

  if (!isSend) {
    throw new CustomError(HttpCode.SE, MESSAGES.ServiceUnv);
  }

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    message: `Repeated verification for  email:${email} was send`,
  });
};

module.exports = repeatEmailForVerifyUser;

const { HttpCode, MESSAGES } = require("../../utils");

const {
  Email: { EmailService, SenderNodemailer },
} = require("../../service");
const { AuthService } = require("../../service");
const { CustomError } = require("../../helpers");

const registration = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await AuthService.isUserExist(email);

  //  if email has already exist in base -> error
  if (isUserExist) {
    throw new CustomError(HttpCode.CONFLICT, MESSAGES.emailExist);
  }

  const userData = await AuthService.create(req.body);

  const emailService = new EmailService(
    process.env.NODE_ENV,
    new SenderNodemailer()
  );

  const isSend = await emailService.sendVerifyEmail(
    email,
    userData.name,
    userData.verificationToken
  );

  if (!isSend) {
    throw new CustomError(HttpCode.SE, MESSAGES.ServiceUnv);
  }

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      newUser: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        subscription: userData.subscription,
        avatarURL: userData.avatarURL,
      },
    },
  });
};

module.exports = registration;

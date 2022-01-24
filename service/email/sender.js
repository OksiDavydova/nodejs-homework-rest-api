const nodemailer = require("nodemailer");

const {
  VARIABLES_ENV: { META_UA_PASSWORD, META_UA_EMAIL },
} = require("../../utils");

class SenderNodemailer {
  async send(msg) {
    const config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: META_UA_EMAIL,
        pass: META_UA_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(config);

    return await transporter.sendMail(
      {
        ...msg,
        from: META_UA_EMAIL,
      },
      (error, info) => {
        if (error) {
          return console.log("error in sender", error);
        }

        console.log("Message sent(nodemailerSender): %s", info.messageId);
      }
    );
  }
}

module.exports = SenderNodemailer;

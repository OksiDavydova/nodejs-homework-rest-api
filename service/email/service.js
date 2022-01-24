const Mailgen = require("mailgen");
const { setLink } = require("../../helpers");

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    this.link = setLink(env);
  }

  createEmailTemplate(userName, verificationToken) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "hw06-email",
        link: this.link,
      },
    });

    const email = {
      body: {
        name: userName,
        intro: "Welcome!",
        action: {
          instructions: "To get started our Api, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verificationToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, userName, verificationToken) {
    const emailBody = this.createEmailTemplate(userName, verificationToken);
    const msg = {
      to: email,
      subject: "Verify email",
      html: emailBody,
    };

    try {
      const result = await this.sender.send(msg);
      console.log(" EmailService result = true", result);
      return true;
    } catch (error) {
      console.log("error EmailService", error);
      console.error(error.message);
      return false;
    }
  }
}

module.exports = EmailService;

// switch (env) {
//   case "development":
//     this.link = "https://09b2-176-105-198-39.ngrok.io";
//     break;
//   case "test":
//     this.link = "https://localhost:5000";
//     break;
//   case "production":
//     this.link = "//heroku";
//     break;
//   default:
//     this.link = "https://09b2-176-105-198-39.ngrok.io ";
//     break;
// }

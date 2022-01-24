const { contactRepository } = require("../../repository");
const { HttpCode } = require("../../utils");
const { Contact } = require("../../model");
const { CustomError } = require("../../helpers");

const postContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const { email, phone } = req.body;
  const isExistEmail = await Contact.find({ email: email, phone: phone });

  if (isExistEmail) {
    throw new CustomError(
      HttpCode.CONFLICT,
      `contact with email:'${email}' or phone: '${phone}' - has already exist`
    );
  }

  const newContact = await contactRepository.addContact(userId, req.body);
  res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, data: { newContact } });
};
module.exports = postContact;

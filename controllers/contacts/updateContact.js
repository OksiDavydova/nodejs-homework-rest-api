const { contactRepository } = require("../../repository");
const { HttpCode } = require("../../utils");
const { CustomError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const contact = await contactRepository.updateContact(userId, id, req.body);

  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(
    HttpCode.NOT_FOUND,
    `contact with id:'${id}' - not found`
  );
};

module.exports = updateContact;

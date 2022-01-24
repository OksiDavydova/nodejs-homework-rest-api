const { contactRepository } = require("../../repository");
const { HttpCode } = require("../../utils");
const { CustomError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await contactRepository.removeContact(userId, id);

  if (contact) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: `contact with id:'${id}' deleted`,
    });
  }
  throw new CustomError(
    HttpCode.NOT_FOUND,
    `contact with id:'${id}' - not found`
  );
};
module.exports = removeContact;

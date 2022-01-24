const { contactRepository } = require("../../repository");
const { HttpCode } = require("../../utils");
const { CustomError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await contactRepository.getById(userId, id);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found");
};

module.exports = getContactById;

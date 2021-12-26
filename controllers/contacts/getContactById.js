const repositoryContacts = require("../../repository");
const { HttpCode } = require("../../utils");

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.getById(id);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "Not found",
  });
};

module.exports = getContactById;

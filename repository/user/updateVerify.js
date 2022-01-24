const { User } = require("../../model");

const updateVerify = async (id, status) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { verify: status, verificationToken: null }
  );
};

module.exports = updateVerify;

const { User } = require("../../model");

const updateAvatar = async (id, avatarURL, idAvatarCloud = null) => {
  console.log(id);
  return await User.updateOne({ _id: id }, { avatarURL, idAvatarCloud });
};

module.exports = updateAvatar;

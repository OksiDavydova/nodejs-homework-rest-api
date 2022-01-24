const { Router } = require("express");
const { authControllers } = require("../../../controllers");
const {
  registration,
  login,
  logout,
  currentUser,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} = authControllers;
const {
  guard,
  userValidation,
  upload,
  wrapperError,
} = require("../../../middleware");

const authRouter = Router();

authRouter.route("/signup").post(userValidation, wrapperError(registration));
authRouter.route("/login").post(userValidation, wrapperError(login));
authRouter.route("/logout").post(guard, wrapperError(logout));
authRouter.route("/current").post(currentUser);
authRouter
  .route("/avatar")
  .patch(guard, upload.single("avatar"), wrapperError(uploadAvatar));
authRouter.route("/verify/:token").get(wrapperError(verifyUser));
authRouter.route("/verify").post(wrapperError(repeatEmailForVerifyUser));
module.exports = authRouter;

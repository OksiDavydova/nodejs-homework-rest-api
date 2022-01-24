const { Router } = require("express");
const { contactsControllers } = require("../../../controllers");
const {
  guard,
  contactsValidation,
  wrapperError,
} = require("../../../middleware");

const {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} = contactsValidation;
const {
  getContacts,
  getContactById,
  postContact,
  removeContact,
  updateContact,
} = contactsControllers;

const router = Router();

router.route("/").get([guard, validateQuery], wrapperError(getContacts));
router.route("/:id").get([guard, validateId], wrapperError(getContactById));
router.route("/").post([guard, validateCreate], wrapperError(postContact));
router.route("/:id").delete([guard, validateId], wrapperError(removeContact));
router
  .route("/:id")
  .put([guard, validateId, validateUpdate], wrapperError(updateContact));
router
  .route("/:id/favorite")
  .patch(
    [guard, validateId, validateUpdateFavorite],
    wrapperError(updateContact)
  );

module.exports = router;

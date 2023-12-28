const { Router } = require("express");
const { createDb } = require("../controllers/table");
const { registerValidation, loginValidation } = require("../validators/auth");
const {
  validationMiddleware,
} = require("../middlewares/validations-middlware");
const {
  registerUsers,
  loginUsers,
  getUsers,
  protected,
  logoutUsers,
} = require("../controllers/auth");
const { userAuth } = require("../middlewares/auth-middleware");

const router = Router();

router.post(
  "/register",
  registerValidation,
  validationMiddleware,
  registerUsers
);
router.post("/login", loginValidation, validationMiddleware, loginUsers);
router.get("/logout", logoutUsers);
router.get("/protected", userAuth, protected);

module.exports = router;

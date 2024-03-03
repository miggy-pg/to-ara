const { check } = require("express-validator");
const db = require("../db");
const bcrypt = require("bcryptjs");

// password
const password = check("password")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long")
  .matches(/\d/)
  .withMessage("Password must contain a number");

// email
const email = check("email")
  .isEmail()
  .withMessage("Please provide a valid email address");

const emailExists = check("email").custom(async (value) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
      value,
    ]);
    if (rows.length) {
      throw new Error("Email is already in use");
    }
  } catch (err) {
<<<<<<< HEAD
    console.log("err: ", err);
=======
>>>>>>> 886ab8f (fix: page filters)
    console.log(err.message);
  }
});

// login validation
const loginFieldsCheck = check("email").custom(async (value, { req }) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    value,
  ]);
  console.log("rows: ", rows[0]);
  if (!rows[0].email.length) {
    throw new Error("Email is not registered");
  }
  const validPassword = await bcrypt.compareSync(
    req.body.password,
    rows[0].password
  );
  if (!validPassword) {
    throw new Error("Password is incorrect");
  }

  // set user to req.user so we can set it as payload for jwt
  req.user = rows[0];
});

module.exports = {
  registerValidation: [email, password, emailExists],
  loginValidation: [loginFieldsCheck],
};

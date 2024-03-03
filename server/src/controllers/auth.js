const db = require("../db");
const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM users");
  } catch (err) {
    console.log(err.message);
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({ message: "Protected info" });
  } catch (err) {
    console.log(err.message);
  }
};

exports.registerUsers = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("req: ", req);
  console.log("reqBody: ", req.body);

  try {
    const hashedPassword = await hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
<<<<<<< HEAD
    console.log("error: ", err.message);
    return res.status(500).json({ message: err.response.data.message });
=======
    console.log(err.message);
    return res.status(500).json({ message: err.message });
>>>>>>> 886ab8f (fix: page filters)
  }
};

exports.loginUsers = async (req, res) => {
  // since we have assigned req.user in loginFieldsCheck, we can access it here
  let user = req.user;
  payload = { id: user.id, email: user.email };

  console.log("res: ", res.status);
  try {
    // sign jwt
    const token = await sign(payload, JWT_SECRET);

    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      sucess: true,
      admin: user.admin,
      message: "Login successful. Dive into new destinations!",
    });
  } catch (err) {
    console.log(err.message);
<<<<<<< HEAD
    return res.status(500).json({ error: err.response.data.message });
=======
    return res.status(500).json({ error: err.message });
>>>>>>> 886ab8f (fix: page filters)
  }
};

exports.logoutUsers = async (req, res) => {
  // we need to delete the token from the cookie
  try {
    return res
      .status(200)
      .clearCookie("token ", { httpOnly: true })
      .json({ sucess: true, message: "Logged out successfully" });
  } catch (err) {
<<<<<<< HEAD
    console.log("message:", err.message);
    return res.status(500).json({ error: err.response.data.message });
=======
    console.log(err.message);
    return res.status(500).json({ error: err.message });
>>>>>>> 886ab8f (fix: page filters)
  }
};

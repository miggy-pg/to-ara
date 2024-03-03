const { JWT_SECRET } = require("../constants");
const { hash } = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM users");
    return res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const { rows: getUser } = await db.query(
      "SELECT * from users where id = $1",
      [req.params.id]
    );

    const { rows: attractions } = await db.query("SELECT * FROM users");

    res.status(200).json({
      status: "succes",
      data: {
        getUser: getUser,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, phone, address, admin } = req.body;

  if (!req.file) {
  }

  try {
    const { rows } = await db.query(
      `
      INSERT INTO users (name, email, password, phone, address, admin)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
      `,
      [name, email, password, phone, address, admin]
    );
    res.status(201).json({
      status: "success",
      data: {
        users: rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.editUser = async (req, res) => {
  const { name, email, password, phone, address, admin } = req.body;

  try {
    const { rows } = await db.query(
      `UPDATE users 
      SET name = $1, 
        email = $2, 
          password = $3, 
          phone = $4, 
          address = $5, 
          admin = $6
          WHERE id = $7
          RETURNING *`,
      [name, email, password, phone, address, admin, req.params.id]
    );
    res.status(200).json({
      status: "succes",
      data: {
        users: rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const results = db.query("DELETE FROM users where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getLoggedInUser = async (req, res) => {
  const jwt_payload = jwt.decode(req.cookies.token);
  const userId = jwt_payload.id;

  try {
    const { rows: user } = await db.query("SELECT * from users WHERE id = $1", [
      userId,
    ]);

    res.status(200).json({
      status: "succes",
      data: {
        user: user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, address, contact } = req.body;

  const jwt_payload = jwt.decode(req.cookies.token);
  const userId = jwt_payload.id;

  if (!req.cookies.token) return res.status(401).json("Not authenticated!");
  const hashedPassword = await hash(req.body.password, 10);

  jwt.verify(req.cookies.token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    db.query(
      `UPDATE users 
  SET name = $1, 
      email = $2, 
      password = $3, 
      address = $4, 
      phone = $5 
  WHERE id = $6 
  RETURNING *`,
      [name, email, hashedPassword, address, contact, userId],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.rows.length > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};

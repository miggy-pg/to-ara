const db = require("../db");

exports.getFestivals = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, name, image, longitude, latitude, address, festival_date, LEFT(description, 125) || CASE WHEN LENGTH(description) > 100 THEN '...' ELSE '' END AS description FROM festival");
    return res.status(200).json({ data: rows });
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

exports.getFestival = async (req, res) => {
  try {
    const { rows: currFestival } = await db.query(
      "SELECT * from festival where id = $1",
      [req.params.id]
    );
    const { rows: festivals } = await db.query("SELECT id, name, image, longitude, latitude, address, festival_date, LEFT(description, 125) || CASE WHEN LENGTH(description) > 100 THEN '...' ELSE '' END AS description FROM festival");

    res.status(200).json({
      status: "succes",
      data: {
        currFestival: currFestival,
        festivals: festivals,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createFestival = async (req, res) => {
  const { name, address, latitude, longitude, festival_date, description } =
    req.body;

  try {
    const { rows } = await db.query(
      `
      INSERT INTO festival (name, address, latitude, longitude, festival_date, description, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
      `,
      [
        name,
        address,
        latitude,
        longitude,
        festival_date,
        description,
        req.file?.filename,
      ]
    );
    res.status(201).json({
      status: "success",
      data: {
        festival: rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.editFestival = async (req, res) => {
  const { name, address, latitude, longitude, festival_date, description } =
    req.body;

  try {
    const { rows } = await db.query(
      `UPDATE festival 
      SET name = $1, 
        address = $2, 
          latitude = $3, 
          longitude = $4, 
          festival_date = $5, 
          description = $6, 
          image = $7
          WHERE id = $8
          RETURNING *`,
      [
        name,
        address,
        latitude,
        longitude,
        festival_date,
        description,
        req.file?.filename,
        req.params.id,
      ]
    );
    res.status(200).json({
      status: "succes",
      data: {
        festivals: rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteFestival = async (req, res) => {
  try {
    const results = db.query("DELETE FROM festival where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
};

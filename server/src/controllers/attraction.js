const db = require("../db");

exports.getAttractions = async (req, res) => {
  try {
<<<<<<< HEAD
    const { rows } = await db.query("SELECT * FROM attraction");
=======
    const { rows } = await db.query("SELECT id, name, image, longitude, latitude, address, entrance_fee, LEFT(description, 125) || CASE WHEN LENGTH(description) > 100 THEN '...' ELSE '' END AS description FROM attraction");
>>>>>>> 886ab8f (fix: page filters)
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

exports.getAttraction = async (req, res) => {
  try {
    const { rows: getAttraction } = await db.query(
      "SELECT * from attraction where id = $1",
      [req.params.id]
    );
<<<<<<< HEAD
    const { rows: accommodations } = await db.query("SELECT * FROM accommodation");

    res.status(200).json({
      status: "succes",
      data: {
        currAttraction: getAttraction,
        accommodations: accommodations,
=======
    const { rows: attractions } = await db.query("SELECT id, name, image, longitude, latitude, address, entrance_fee, LEFT(description, 125) || CASE WHEN LENGTH(description) > 100 THEN '...' ELSE '' END AS description FROM attraction");

    res.status(200).json({
      status: "success",
      data: {
        currAttraction: getAttraction,
        attractions: attractions,
>>>>>>> 886ab8f (fix: page filters)
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createAttraction = async (req, res) => {
  const {
    name,
    visiting_hours_from,
    visiting_hours_to,
    entrance_fee,
    address,
    longitude,
    latitude,
    contact,
    description,
    direction,
  } = req.body;

  try {
    const { rows } = await db.query(
      `
      INSERT INTO attraction (name, visiting_hours_from, visiting_hours_to, entrance_fee, address, longitude, latitude, contact, description, direction, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;
      `,
      [
        name,
        visiting_hours_from,
        visiting_hours_to,
        entrance_fee,
        address,
        longitude,
        latitude,
        contact,
        description,
        direction,
        req.file?.filename,
      ]
    );
    res.status(201).json({
      status: "success",
      data: {
        attraction: rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.editAttraction = async (req, res) => {
  const {
    name,
    visiting_hours_from,
    visiting_hours_to,
    entrance_fee,
    address,
    longitude,
    latitude,
    contact,
    description,
    direction,
  } = req.body;

  try {
    const { rows } = await db.query(
      `UPDATE attraction 
      SET name = $1, 
        visiting_hours_from = $2, 
          visiting_hours_to = $3, 
          entrance_fee = $4, 
          address = $5, 
          longitude = $6, 
          latitude = $7, 
          contact = $8, 
          description = $9,
          direction = $10,
          image = $11
          WHERE id = $12
          RETURNING *`,
      [
        name,
        visiting_hours_from,
        visiting_hours_to,
        entrance_fee,
        address,
        longitude,
        latitude,
        contact,
        description,
        direction,
        req.file?.filename,
        req.params.id,
      ]
    );
    res.status(200).json({
      status: "succes",
      data: {
        retaurant: rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteAttraction = async (req, res) => {
  try {
    const results = db.query("DELETE FROM attraction where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
};

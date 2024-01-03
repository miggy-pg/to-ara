const db = require("../db");

exports.getAccommodations = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM accommodation");
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

exports.getAccommodation = async (req, res) => {
  try {
    const { rows: accommodation } = await db.query(
      "SELECT * from accommodation where id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "succes",
      accommodation: accommodation,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createAccommodation = async (req, res) => {
  const {
    name,
    address,
    latitude,
    longitude,
    price,
    contact,
    status,
    description,
    direction,
    amenities,
  } = req.body;

  console.log(req.file);
  try {
    const { rows } = await db.query(
      `
      INSERT INTO accommodation (name, address, latitude, longitude, price, contact, status, description, direction, amenities, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;
      `,
      [
        name,
        address,
        latitude,
        longitude,
        price,
        contact,
        status,
        description,
        direction,
        [amenities],
        req.file?.filename,
      ]
    );
    res.status(201).json({
      status: "success",
      data: {
        accommodation: rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.editAccommodation = async (req, res) => {
  const {
    name,
    address,
    latitude,
    longitude,
    price,
    contact,
    status,
    description,
    direction,
    amenities,
  } = req.body;

  try {
    const { rows } = await db.query(
      `UPDATE accommodation 
      SET name = $1, 
        address = $2, 
          latitude = $3, 
          longitude = $4, 
          price = $5,
          contact = $6, 
          status = $7,
          description = $8, 
          direction = $9, 
          amenities = $10,
          image = $11
          WHERE id = $12
          RETURNING *`,
      [
        name,
        address,
        latitude,
        longitude,
        price,
        contact,
        status,
        description,
        direction,
        [amenities],
        req.file?.filename,
        req.params.id,
      ]
    );
    res.status(200).json({
      status: "succes",
      data: {
        accomodations: rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteAccommodation = async (req, res) => {
  try {
    const results = db.query("DELETE FROM accommodation where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
};

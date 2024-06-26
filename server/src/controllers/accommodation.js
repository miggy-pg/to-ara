const db = require("../db");

exports.getAccommodations = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, name, image, price, longitude, latitude, amenities, address, status, LEFT(description, 125) || CASE WHEN LENGTH(description) > 100 THEN '...' ELSE '' END AS description FROM accommodation");
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
    const { rows: currAccomodation } = await db.query(
      "SELECT * from accommodation where id = $1",
      [req.params.id]
    );
    const { rows: accomodations } = await db.query(
      "SELECT id, name, image, price, amenities, longitude, latitude, address, status, LEFT(description, 125) || CASE WHEN LENGTH(description) > 100 THEN '...' ELSE '' END AS description FROM accommodation"
    );

    res.status(200).json({
      status: "succes",
      data: {
        currAccomodation: currAccomodation,
        accomodations: accomodations,
      },
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
        JSON.stringify(amenities),
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

exports.addToFavorite = async(req, res) => {
  const {id, userId} = req.body
  
  try {
    await db.query("INSERT INTO user_favorites (user_id, accommodation_id) VALUES ($1, $2);", [userId, id])

  }
  catch(err){
    console.log(err)
  }
}

exports.removeFromAccommodationFavorite = async(req, res) => {
  const {id, userId} = req.body
  try {
    await db.query("DELETE FROM user_favorites WHERE user_id = $1 AND accommodation_id = $2;", [userId, id])

  }
  catch(err){
    console.log(err)
  }
}

exports.getAccommodationFavorites = async(req, res) => {
  try{
    const userId = req.params.userId

    const {rows} = await db.query("SELECT a.id, a.name, a.description, a.image FROM accommodation a JOIN user_favorites uf ON a.id = uf.accommodation_id WHERE uf.user_id = $1; ", [userId]);

    return res.status(200).json(rows);
  }catch(err){
    console.log(err);
  }
}

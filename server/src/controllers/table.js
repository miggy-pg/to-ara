const db = require("../db");

// 1) Create a database
const createDb = {
  query: "CREATE DATABASE tourist_system;",
  response: "Database created successfully!",
};

// 2) Create a user table
const userTbleQuery = {
  query: `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    address VARCHAR(100),
    admin BOOLEAN DEFAULT FALSE
);`,
  response: "User table created successfully!",
};

// 3) Create a attraction table
const attractionTbleQuery = {
  query: `CREATE TABLE attraction (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    visiting_hours_from TIME NOT NULL,
    visiting_hours_to TIME NOT NULL,
    entrance_fee DECIMAL(10, 2) NOT NULL,
    address VARCHAR(200), 
    longitude DECIMAL(9, 6) NOT NULL,
    latitude DECIMAL(8, 6) NOT NULL,
    contact VARCHAR(30),
    description TEXT,
    direction TEXT,
    image VARCHAR(400)
);`,
  response: "Attraction table created successfully!",
};

// 4) Create a festival table
const festivalTbleQuery = {
  query: `CREATE TABLE festival (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    address VARCHAR(200), 
    latitude DECIMAL(8, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    festival_date DATE, -- Assuming a date field for the festival date
    description TEXT,
    image VARCHAR(400)
);`,
  response: "Festival table created successfully!",
};

// 5) Create a accomodation table
const accomodationTbleQuery = {
  query: `CREATE TABLE accommodation (
    id SERIAL PRIMARY KEY,
    image VARCHAR(400),
    name VARCHAR(200) NOT NULL,
    address VARCHAR(200), 
    price DECIMAL(10, 2),
    latitude DECIMAL(8, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    contact VARCHAR(30),
    status VARCHAR(50),
    description TEXT,
    direction TEXT,
    amenities TEXT ARRAY 
);`,
  response: "Festival table created successfully!",
};

exports.createDb = async (req, res) => {
  try {
    // Steps:
    // 1) Create a database
    // 2) Create a user table

    // NOTE: Replace userTbleQuery.query with attractionTbleQuery.query to create attraction table
    // or any other query you want to execute
    const response = await db.query(userTbleQuery.query);
  } catch (err) {
    console.log(err.message);
  }
};

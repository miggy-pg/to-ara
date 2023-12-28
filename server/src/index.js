const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

const { BASE_CLIENT_URL, SERVER_PORT } = require("./constants");

// import passport middleware
require("./middlewares/passport-middleware");

// initialize middlewares
app.use(express.json()); // for parsing application/json

const attractionsImagesPath = path.join(
  __dirname,
  "..",
  "images",
  "attractions"
);
app.use("/images/attractions", express.static(attractionsImagesPath)); // for serving static files

const festivalImagesPath = path.join(__dirname, "..", "images", "festivals");
app.use("/images/festivals", express.static(festivalImagesPath)); // for serving static files

const accommodationImagesPath = path.join(
  __dirname,
  "..",
  "images",
  "accommodations"
);
app.use("/images/accommodations", express.static(accommodationImagesPath)); // for serving static files

app.use(cookieParser());
// localhost:5173 (client)
// localhost:4000 (server)
// CORS middleware blocks communication between client and server
app.use(cors({ origin: BASE_CLIENT_URL, credentials: true }));
app.use(passport.initialize());

// Our server port is listening at http://localhost:4000
// So any request to http://localhost:4000/api/user... will be handled by the routes
app.use("/api/user", require("./routes/auth"));
app.use("/api/v1", require("./routes/attraction"));
app.use("/api/v1", require("./routes/user"));
app.use("/api/v1", require("./routes/festival"));
app.use("/api/v1", require("./routes/accommodation"));

app.listen(SERVER_PORT, () =>
  console.log("Server is running on localhost:4000")
);

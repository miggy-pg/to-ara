const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/festivals");
  },
  filename: function (req, file, cb) {
    console.log("file: ", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const multerMiddleware = multer({ storage: storage });

module.exports = multerMiddleware;

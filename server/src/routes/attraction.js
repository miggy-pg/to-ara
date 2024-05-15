const { Router } = require("express");
const {
  createAttraction,
  deleteAttraction,
  editAttraction,
  getAttractions,
  getAttraction,
  addToFavorite,
  removeFromFavorite,
  getAttractionFavorites,
} = require("../controllers/attraction");
const multerMiddleware = require("../middlewares/attraction-multer-middleware");
const {
  validationMiddleware,
} = require("../middlewares/validations-middlware");

/*
| CRUD Operation           | HTTP Method | Route                     |
|--------------------------|-------------|---------------------------|
| Retrieve All Attractions | GET         | /api/v1/attractions       |
| Retrieve One Attraction  | GET         | /api/v1/attractions/:id   |
| Create Attraction        | POST        | /api/v1/attractions       |
| Update Attraction        | PUT         | /api/v1/attractions/:id   |
| Delete Attraction        | DELETE      | /api/v1/attractions/:id   |
*/

const router = Router();

router.get("/attractions", validationMiddleware, getAttractions);
router.get("/attractions/:id", validationMiddleware, getAttraction);
router.get("/favorites/attractions", getAttractionFavorites);
router.put("/attractions/favorites/add", validationMiddleware, addToFavorite);
router.put("/attractions/favorites/remove", validationMiddleware, removeFromFavorite);
router.post("/attractions", multerMiddleware.single("image"), createAttraction);
router.put(
  "/attractions/:id",
  multerMiddleware.single("image"),
  editAttraction
);
router.delete("/attractions/:id", validationMiddleware, deleteAttraction);

module.exports = router;

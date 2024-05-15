const { Router } = require("express");
const {
  createAccommodation,
  deleteAccommodation,
  editAccommodation,
  getAccommodations,
  getAccommodation,
  getAccommodationFavorites,
  addToFavorite,
  removeFromAccommodationFavorite,
} = require("../controllers/accommodation");
const multerMiddleware = require("../middlewares/accommodation-multer-middleware");
const {
  validationMiddleware,
} = require("../middlewares/validations-middlware");

/*
| CRUD Operation           | HTTP Method | Route                     |
|--------------------------|-------------|---------------------------|
| Retrieve All Accomodations | GET         | /api/v1/accomodations       |
| Retrieve One Accomodation  | GET         | /api/v1/accomodations/:id   |
| Create Accomodation        | POST        | /api/v1/accomodations       |
| Update Accomodation        | PUT         | /api/v1/accomodations/:id   |
| Delete Accomodation        | DELETE      | /api/v1/accomodations/:id   |
*/

const router = Router();

router.get("/accommodations", validationMiddleware, getAccommodations);
router.get("/accommodations/:id", validationMiddleware, getAccommodation);
router.get("/favorites/accommodations", getAccommodationFavorites);
router.put("/accommodations/favorites/add", validationMiddleware, addToFavorite);
router.put("/accommodations/favorites/remove", validationMiddleware, removeFromAccommodationFavorite);

router.post(
  "/accommodations",
  multerMiddleware.single("image"),
  createAccommodation
);
router.put(
  "/accommodations/:id",
  multerMiddleware.single("image"),
  editAccommodation
);
router.delete("/accommodations/:id", validationMiddleware, deleteAccommodation);

module.exports = router;

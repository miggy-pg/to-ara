const { Router } = require("express");
const {
  createFestival,
  deleteFestival,
  editFestival,
  getFestivals,
  getFestival,
  getFestivalFavorites,
  addToFavorite,
  removeFromFestivalFavorite,
} = require("../controllers/festival");
const multerMiddleware = require("../middlewares/festival-multer-middleware");
const {
  validationMiddleware,
} = require("../middlewares/validations-middlware");

/*
| CRUD Operation         | HTTP Method | Route                     |
|------------------------|-------------|---------------------------|
| Retrieve All Festivals | GET         | /api/v1/festivals       |
| Retrieve One Festival  | GET         | /api/v1/festivals/:id   |
| Create Festival        | POST        | /api/v1/festivals       |
| Update Festival        | PUT         | /api/v1/festivals/:id   |
| Delete Festival        | DELETE      | /api/v1/festivals/:id   |
*/

const router = Router();

router.get("/festivals", validationMiddleware, getFestivals);
router.get("/festivals/:id", validationMiddleware, getFestival);
router.get("/favorites/festivals", getFestivalFavorites);
router.put("/festivals/favorites/add", validationMiddleware, addToFavorite);
router.put("/festivals/favorites/remove", validationMiddleware, removeFromFestivalFavorite);

router.post("/festivals", multerMiddleware.single("image"), createFestival);
router.put("/festivals/:id", multerMiddleware.single("image"), editFestival);
router.delete("/festivals/:id", validationMiddleware, deleteFestival);

module.exports = router;

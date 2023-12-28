const { Router } = require("express");
const {
  getLoggedInUser,
  updateUser,
  editUser,
  createUser,
  getUsers,
  deleteUser,
  getUser,
} = require("../controllers/user");
const {
  validationMiddleware,
} = require("../middlewares/validations-middlware");

const router = Router();

// DASHBOARD CRUD
/*
| CRUD Operation     | HTTP Method | Route                     |
|--------------------|-------------|---------------------------|
| Retrieve All Users | GET         | /api/v1/users       |
| Retrieve One User  | GET         | /api/v1/users/:id   |
| Create User        | POST        | /api/v1/users       |
| Update User        | PUT         | /api/v1/users/:id   |
| Delete User        | DELETE      | /api/v1/users/:id   |
*/

router.get("/users", validationMiddleware, getUsers);
router.get("/users/:id", validationMiddleware, getUser);
router.post("/users", validationMiddleware, createUser);
router.put("/users/:id", validationMiddleware, editUser);
router.delete("/users/:id", validationMiddleware, deleteUser);

router.get("/profile", getLoggedInUser);
router.put("/profile", updateUser);

module.exports = router;

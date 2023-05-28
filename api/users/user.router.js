const express = require("express");
const { checkToken } = require("../../middlewares/token_validation");

const router = express.Router();

const {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
} = require("./user.controller");

router.post("/create", createUser);
router.post("/get", checkToken, getUserById);
router.post("/update", checkToken, updateUserById);
router.post("/delete", checkToken, deleteUserById);
router.post("/login", login);

module.exports = router;

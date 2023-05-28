const express = require("express");
const { checkToken } = require("../../auth/token_validation");

const router = express.Router();

const {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("./user.controller");

// router.post("/", checkToken, createUser);
// router.post("/", checkToken, getUserById);
// router.post("/", checkToken, updateUserById);
// router.post("/", checkToken, deleteUserById);

router.post("/create", createUser);
router.post("/get", getUserById);
router.post("/update", updateUserById);
router.post("/delete", deleteUserById);

module.exports = router;

const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .get("/", userController.getAllUsers)
  .post("/", userController.creteNewUser);

module.exports = router;

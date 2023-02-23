const express = require("express");
const taskController = require("../../controllers/taskController.js");

const router = express.Router();

router
    .get("/:taskId", taskController.getOneTask)
    .post("/", taskController.createNewTask)
    .put("/:taskId", taskController.updateTask)
    .delete("/:taskId", taskController.deleteTask);

module.exports = router;

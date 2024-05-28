const express = require("express");
const userController = require("../controllers/user-controller");
const { isAuth } = require("../utils/isAuth");

const router = express.Router();

router.put("/updateUser/:id", userController.updateUserCredentials);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;

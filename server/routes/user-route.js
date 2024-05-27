const express = require("express");
const userController = require("../controllers/user-controller");
const { isAuth } = require("../utils/isAuth");

const router = express.Router();

router.put("/updateUser/:id", userController.updateUserCredentials);

module.exports = router;

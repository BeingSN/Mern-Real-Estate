const express = require("express");
const authController = require("../controllers/auth-controller");

const router = express.Router();

router.post("/auth/signup", authController.signUpController);

router.post("/auth/signin", authController.signInController);

module.exports = router;

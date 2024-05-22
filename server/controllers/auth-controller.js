const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.signUpController = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(req.body);
  const newUser = new userModel({
    username: username,
    email: email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return res
      .status(201)
      .json({
        status: 200,
        message: "User created successfully",
        user: newUser,
      });
  } catch (error) {
    next(error);
  }
};

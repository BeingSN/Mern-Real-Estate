const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");

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
    return res.status(201).json({
      status: 200,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.signInController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await userModel.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = await bcrypt.compareSync(
      password,
      validUser.password
    );
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));
    if (validPassword && validUser) {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          data: rest,
          status: 200,
          message: "Logged In Successfully",
          token: token,
        });
    }
  } catch (error) {
    next(error);
  }
};

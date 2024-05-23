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
  console.log(email);

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

exports.signInWithGoogle = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = user;
      res
        .cookie("access-token", token, { httpOnly: true })
        .status(200)
        .json({ status: 200, rest, token: token });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new userModel({
        email: req.body.email,
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        password: hashedPassword,
        avatar: req.body.photo,
      });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ status: 200, rest, token: token });
      return newUser.save();
    }
  } catch (err) {
    next(err);
  }
};

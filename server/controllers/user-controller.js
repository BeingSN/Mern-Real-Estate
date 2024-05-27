const userSchema = require("../models/user.model");
const { errorHandler } = require("../utils/error");
const bcrypt = require("bcryptjs");

exports.updateUserCredentials = async (req, res) => {
  const { email, username, password, avatar } = req.body;
  const { id } = req.params;

  try {
    const user = await userSchema.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create an object to hold the fields that need to be updated
    const updateFields = {};

    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (avatar) updateFields.avatar = avatar;
    if (password) updateFields.password = await bcrypt.hash(password, 10);

    const updatedUser = await userSchema.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude the password field from the response
    const { password: userPassword, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "An error occurred", error: err.message });
  }
};

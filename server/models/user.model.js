const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvCBZNzX3stNo3MlHYc9fnpNpFHS9GRkzKiCiyK4vT8Q&s",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

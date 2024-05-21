const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

mongoose
  .connect(`${process.env.MONGO}`)
  .then((result) => {
    app.listen(5000, () => {
      console.log(`Server is running on 5000 and Connected to DB!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

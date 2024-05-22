const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user-route");
const authRoutes = require("./routes/auth-routes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoutes);
app.use("/api", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, message, statusCode });
});

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

const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error");

exports.isAuth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  try {
  } catch (err) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return next(errorHandler(403, "Forbidden"));
      req.user = user;
      next();
    });
  }
};

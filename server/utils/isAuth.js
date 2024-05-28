const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error");

exports.isAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Invalid Authorization header format" });
  }
  const token = tokenParts[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      // Token is valid, attach decoded payload to request object
      req.user = decoded;
      next();
    }
  });
};

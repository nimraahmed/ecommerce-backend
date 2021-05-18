const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("login-token"); //check if token exists
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    if (verified.role === "admin") next();
    else {
      res.status(400).send("Access denied");
    }
  } catch (err) {
    res.status(400).send("invalid token");
  }
};

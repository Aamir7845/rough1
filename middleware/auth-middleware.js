const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  console.log(req.header);
  if (!token) {
    return res.status(401).send({
      error: "Access denied",
    });
  }
  try {
    const decode = jwt.verify(token, "seceret");
    console.log(decode);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).send({
      error: "Invalid token",
    });
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).send({
      error: "Forbidden",
    });
  }
}
module.exports = { verifyToken, isAdmin };

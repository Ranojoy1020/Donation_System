const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"].replace(/^Bearer\s+/, "")
    
    if (!token) {
    return res.status(403).send({ message: "No token provided." });
    }
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token." });
    }
    
    req.userId = decoded.id;
    
    next();
  });
};

const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).json("Token nie jest prawidłowy");
      req.user = user;
      console.log("token okokok");
      next();
    });
  } else {
    return res.status(401).json("Nie masz uprawnień");
  }
}

module.exports = verify;

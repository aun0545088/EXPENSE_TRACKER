const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  if (!req.headers.authentication) {
    return res.status(401).json({ message: "Please login again" });
  }
  const user_token = req.headers.authentication.split(" ")[1];
  jwt.verify(user_token, "shhhhh", function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: "Please login again" });
    }
    // console.log(decoded);
    req.body.email = decoded.email;
    req.body.userId = decoded.userId;

    // Generate the new token and set as header in response
    const token = jwt.sign({ email: decoded.email, userId: decoded.userId }, "shhhhh", {
      expiresIn: "1h",
    });
    res.setHeader('authentication', `Bearer ${token}`);
    next();
  });
};

module.exports = authentication;

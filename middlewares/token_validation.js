const { verify } = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          console.log(err);
          if (err.name == "TokenExpiredError") {
            return res.json({
              success: 0,
              message: "Token expired.",
            });
          } else {
            return res.json({
              success: 0,
              message: "Invalid Token.",
            });
          }
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access denied! Unauthorized user",
      });
    }
  },
};

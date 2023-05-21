const { create } = require("./user.service");

const { genSalt, hash } = require("bcrypt");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const saltRounds = 10;

    genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Error generating salt",
        });
      }

      hash(body.password, salt, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: 0,
            message: "Error hashing password",
          });
        }

        // Store the hashed password in the user object
        body.password = hashedPassword;

        create(body, (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection error",
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      });
    });
  },
};

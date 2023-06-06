const {
  create,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByEmail,
} = require("./user.service");

const { genSalt, hash, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const saltRounds = 10;

    genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Error generating salt.",
        });
      }

      hash(body.password, salt, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: 0,
            message: "Error hashing password.",
          });
        }

        // Store the hashed password in the user object
        body.password = hashedPassword;

        create(body, (err, results) => {
          if (err) {
            // console.error(err);
            if (err.errno == -4078) {
              return res.status(500).json({
                success: 0,
                error: "Database connection error.",
              });
            } else
              return res.status(400).json({
                success: 0,
                error: err,
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
  getUserById: (req, res) => {
    const id = req.body.user_id;
    getUserById(id, (err, results) => {
      // console.log(results);
      if (err) {
        // console.log(err);
        if (err.errno == -4078) {
          return res.status(500).json({
            success: 0,
            error: "Database connection error.",
          });
        } else
          return res.status(400).json({
            success: 0,
            error: err,
          });
      }

      if (results.length < 1) {
        return res.json({
          success: 0,
          message: "User not found.",
        });
      }
      return res.json({
        success: 1,
        data: results[0],
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    const email = req.body.email_address;
    // console.log(body);
    getUserByEmail(email, (err, results) => {
      console.log(results);
      if (err) {
        // console.log(err);
        if (err.errno == -4078) {
          return res.status(500).json({
            success: 0,
            error: "Database connection error",
          });
        } else
          return res.status(400).json({
            success: 0,
            error: err,
          });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "User does not exist.",
        });
      } else {
        const checkPassword = compareSync(body.password, results.password);
        if (checkPassword) {
          results.password = undefined;
          const jsonwebtoken = sign({ results: results }, process.env.JWT_KEY, {
            expiresIn: "3h",
          });
          return res.status(200).json({
            success: 1,
            message: "Login successful.",
            user_id: results.user_id,
            token: jsonwebtoken,
          });
        } else
          return res.status(400).json({
            success: 0,
            message: "Invalid email address or password.",
          });
      }
    });
  },
  updateUserById: (req, res) => {
    const body = req.body;
    const saltRounds = 10;

    genSalt(saltRounds, (err, salt) => {
      if (err) {
        // console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Error generating salt.",
        });
      }

      hash(body.password, salt, (err, hashedPassword) => {
        if (err) {
          // console.error(err);
          return res.status(500).json({
            success: 0,
            message: "Error hashing password.",
          });
        }

        // Store the hashed password in the user object
        body.password = hashedPassword;

        updateUserById(body, (err, results) => {
          // console.log(results);
          if (err) {
            // console.error(err);
            if (err.errno == -4078) {
              return res.status(500).json({
                success: 0,
                error: "Database connection error.",
              });
            } else
              return res.status(400).json({
                success: 0,
                error: err,
              });
          }
          if (results.affectedRows != 1) {
            // console.error(err);
            return res.status(400).json({
              success: 0,
              message: "User not found.",
            });
          }
          return res.status(200).json({
            success: 1,
            message: "User updated successfully.",
          });
        });
      });
    });
  },
  deleteUserById: (req, res) => {
    const id = req.body.user_id;

    deleteUserById(id, (err, results) => {
      if (err) {
        // console.error(err);
        if (err.errno == -4078) {
          return res.status(500).json({
            success: 0,
            error: "Database connection error",
          });
        } else
          return res.status(400).json({
            success: 0,
            error: err,
          });
      }
      if (results.affectedRows != 1) {
        // console.error(err);
        return res.status(400).json({
          success: 0,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "User deleted successfully",
      });
    });
  },
};

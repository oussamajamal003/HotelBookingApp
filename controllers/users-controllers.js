const db = require("../config/db.js");

const getUsers = (req, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Failed to fetch users from database", 
      });
    }
    if (data.length === 0) {
      return res.status(204).send();
    }
    return res.status(200).json({
      message: "Users fetched successfully",
      users: data,
    });
  });
};

const signup = (req, res, next) => {};

const login = (req, res, next) => {};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

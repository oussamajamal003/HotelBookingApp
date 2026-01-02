const bcrypt = require("bcrypt");
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

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(q, [username, email, hashedPassword], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "User already exists or database error",
      });
    }
    return res.status(201).json({
      message: "User created successfully",
    });
  });
};

const login = async (req, res) => {

};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

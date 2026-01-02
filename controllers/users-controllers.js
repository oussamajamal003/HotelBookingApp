const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
 
const login = (req, res) => {
  const { email, password } = req.body;
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Failed to login",
      });
    }
    if (data.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    const user = data[0];
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
    });
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

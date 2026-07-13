const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  const { username, password, household_id } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    db.query(
      "INSERT INTO users (username, password, household_id) VALUES (?, ?, ?)",
      [username, hashedPassword, household_id],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.json({ id: result.insertId, username });
        }
      },
    );
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.send(err);
      } else if (!result[0]) {
        res.status(404).json({ message: "User not found" });
      } else {
        bcrypt.compare(password, result[0].password, (err, match) => {
          if (match === true) {
            const token = jwt.sign(
              { id: result[0].id, username },
              process.env.JWT_SECRET,
            );

            res.json({ token, id: result[0].id, username });
          } else {
            res.status(401).json({ message: "Invalid password" });
          }
        });
      }
    },
  );
});

module.exports = router;

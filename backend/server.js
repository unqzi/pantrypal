require("dotenv").config();

const jwt = require("jsonwebtoken");
const db = require("./db");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const authMiddleware = require("./middleware");

app.use(express.json());
app.post("/households", (req, res) => {
  const name = req.body.name;
  db.query(
    "INSERT INTO households (name) VALUES (?)",
    [name],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ id: result.insertId, name });
      }
    },
  );
});

app.post("/users", (req, res) => {
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

app.post("/login", (req, res) => {
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

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});

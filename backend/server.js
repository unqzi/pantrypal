require("dotenv").config();
const db = require("./db");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

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

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});

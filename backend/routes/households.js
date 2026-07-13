const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
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

module.exports = router;

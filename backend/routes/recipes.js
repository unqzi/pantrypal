const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware");

router.get("/", authMiddleware, (req, res) => {
  db.query(
    "SELECT * FROM recipes WHERE household_id = ?",
    [req.user.household_id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    },
  );
});

router.post("/", authMiddleware, (req, res) => {
  const { name, instructions, image, servings } = req.body;
  db.query(
    "INSERT INTO recipes (name, instructions, image, servings, household_id) VALUES (?,?,?,?,?)",
    [name, instructions, image, servings, req.user.household_id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ id: result.insertId });
      }
    },
  );
});

router.put("/:id", authMiddleware, (req, res) => {
  const { name, instructions, image, servings } = req.body;
  db.query(
    "UPDATE recipes SET name = ?, instructions = ?, image = ?, servings = ? WHERE id = ?",
    [name, instructions, image, servings, req.params.id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Item updated" });
      }
    },
  );
});

router.delete("/:id", authMiddleware, (req, res) => {
  db.query(
    "DELETE from recipes WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "item deleted" });
      }
    },
  );
});

module.exports = router;

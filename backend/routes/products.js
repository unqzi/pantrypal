const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware");

router.get("/", authMiddleware, (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      res.send(err);
    } else res.json(result);
  });
});

router.post("/", authMiddleware, (req, res) => {
  const { name, barcode, category, default_shelf_life } = req.body;
  db.query(
    "INSERT INTO products (name, barcode, category, default_shelf_life) VALUES (?,?,?,?)",
    [name, barcode, category, default_shelf_life],
    (err, result) => {
      if (err) {
        res.send(err);
      } else res.json({ id: result.insertId });
    },
  );
});

router.put("/:id", authMiddleware, (req, res) => {
  const { name, barcode, category, default_shelf_life } = req.body;
  db.query(
    "UPDATE products SET name = ?, barcode = ?, category = ?, default_shelf_life = ? WHERE id = ?",
    [name, barcode, category, default_shelf_life, req.params.id],
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
    "DELETE FROM products WHERE id = ? ",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Item deleted" });
      }
    },
  );
});

module.exports = router;

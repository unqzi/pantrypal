const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware");

router.get("/", authMiddleware, (req, res) => {
  db.query(
    "SELECT * FROM shopping_list WHERE household_id = ?",
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
  const { product_id, quantity, status } = req.body;
  db.query(
    "INSERT INTO shopping_list (product_id, quantity, household_id, status) VALUES (?,?,?,?)",
    [product_id, quantity, req.user.household_id, status],
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
  const { product_id, quantity, status } = req.body;
  db.query(
    "UPDATE shopping_list SET product_id = ?, quantity = ?, status = ? WHERE id = ? ",
    [product_id, quantity, status, req.params.id],
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
    "DELETE FROM shopping_list WHERE id = ?",
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

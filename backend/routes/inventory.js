const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware");

router.get("/", authMiddleware, (req, res) => {
  db.query(
    "SELECT * FROM inventory WHERE household_id = ?",
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
  const { product_id, quantity, location, expiry_date } = req.body;
  db.query(
    "INSERT INTO inventory (product_id, quantity, location, expiry_date, household_id)  VALUES (?, ?, ?, ?, ?)",
    [product_id, quantity, location, expiry_date, req.user.household_id],
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
  const { product_id, quantity, location, expiry_date } = req.body;
  console.log("ID: ", req.params.id);
  db.query(
    "UPDATE inventory SET product_id = ?, quantity = ?, location = ?, expiry_date = ? WHERE id = ?  ",
    [product_id, quantity, location, expiry_date, req.params.id],
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
    "DELETE FROM inventory WHERE id = ? ",
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

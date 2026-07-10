require("dotenv").config();
const db = require("./db");

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

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});

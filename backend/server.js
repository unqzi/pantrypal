require("dotenv").config();
const db = require("./db");

const express = require("express");
const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});

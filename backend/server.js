require("dotenv").config();

const express = require("express");
const app = express();
const authMiddleware = require("./middleware");

app.use(express.json());
app.use("/households", require("./routes/households"));
app.use("/users", require("./routes/users"));

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});

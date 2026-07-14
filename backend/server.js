require("dotenv").config();

const express = require("express");
const app = express();
const authMiddleware = require("./middleware");

app.use(express.json());
app.use("/households", require("./routes/households"));
app.use("/users", require("./routes/users"));
app.use("/inventory", require("./routes/inventory"));
app.use("/products", require("./routes/products"));
app.use("/shopping_list", require("./routes/shopping_list"));
app.use("/recipes", require("./routes/recipes"));

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});

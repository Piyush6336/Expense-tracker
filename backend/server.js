const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Expense Tracker API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

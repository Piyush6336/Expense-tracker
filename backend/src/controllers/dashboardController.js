const db = require("../config/database");
const { getMonthKey } = require("../utils/date");

function getDashboard(req, res) {
  const currentMonth = getMonthKey();

  const dashboardData = {
    totalExpenses: 0,
    monthlyExpenses: 0,
    recentTransactions: [],
  };

  db.get("SELECT SUM(amount) as total FROM expenses WHERE user_id = ?", [req.user.id], (totalErr, totalRow) => {
    if (totalErr) {
      return res.status(500).json({ message: "Failed to load dashboard" });
    }

    dashboardData.totalExpenses = totalRow.total || 0;

    db.get(
      "SELECT SUM(amount) as total FROM expenses WHERE user_id = ? AND substr(date, 1, 7) = ?",
      [req.user.id, currentMonth],
      (monthErr, monthRow) => {
        if (monthErr) {
          return res.status(500).json({ message: "Failed to load dashboard" });
        }

        dashboardData.monthlyExpenses = monthRow.total || 0;

        db.all(
          "SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC, created_at DESC LIMIT 5",
          [req.user.id],
          (recentErr, recentRows) => {
            if (recentErr) {
              return res.status(500).json({ message: "Failed to load dashboard" });
            }

            dashboardData.recentTransactions = recentRows;
            res.json(dashboardData);
          }
        );
      }
    );
  });
}

module.exports = { getDashboard };

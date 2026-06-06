const { v4: uuidv4 } = require("uuid");
const db = require("../config/database");
const { validateExpense } = require("../utils/validators");

function getExpenses(req, res) {
  const { search = "", category = "" } = req.query;

  let sql = "SELECT * FROM expenses WHERE user_id = ?";
  const params = [req.user.id];

  if (search) {
    sql += " AND (title LIKE ? OR note LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  sql += " ORDER BY date DESC, created_at DESC";

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch expenses" });
    }

    res.json(rows);
  });
}

function createExpense(req, res) {
  const errors = validateExpense(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const expense = {
    id: uuidv4(),
    user_id: req.user.id,
    title: req.body.title.trim(),
    amount: Number(req.body.amount),
    category: req.body.category.trim(),
    date: req.body.date,
    note: req.body.note ? req.body.note.trim() : "",
  };

  const sql = `
    INSERT INTO expenses (id, user_id, title, amount, category, date, note)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [expense.id, expense.user_id, expense.title, expense.amount, expense.category, expense.date, expense.note],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to add expense" });
      }

      res.status(201).json(expense);
    }
  );
}

function updateExpense(req, res) {
  const errors = validateExpense(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const sql = `
    UPDATE expenses
    SET title = ?, amount = ?, category = ?, date = ?, note = ?
    WHERE id = ? AND user_id = ?
  `;

  db.run(
    sql,
    [
      req.body.title.trim(),
      Number(req.body.amount),
      req.body.category.trim(),
      req.body.date,
      req.body.note ? req.body.note.trim() : "",
      req.params.id,
      req.user.id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Failed to update expense" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Expense not found" });
      }

      res.json({ message: "Expense updated successfully" });
    }
  );
}

function deleteExpense(req, res) {
  db.run("DELETE FROM expenses WHERE id = ? AND user_id = ?", [req.params.id, req.user.id], function (err) {
    if (err) {
      return res.status(500).json({ message: "Failed to delete expense" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  });
}

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense };

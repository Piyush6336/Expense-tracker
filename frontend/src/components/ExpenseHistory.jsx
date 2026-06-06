import React from "react";
import { Edit, IndianRupee, Search, Trash2 } from "lucide-react";
import { categories } from "../constants/categories";

function ExpenseHistory({
  expenses,
  search,
  categoryFilter,
  onSearchChange,
  onCategoryChange,
  onEdit,
  onDelete,
}) {
  return (
    <section className="history-section">
      <div className="history-header">
        <h2>Expense History</h2>
        <div className="filters">
          <label className="search-box">
            <Search size={17} />
            <input value={search} onChange={onSearchChange} placeholder="Search expenses" />
          </label>
          <select value={categoryFilter} onChange={onCategoryChange}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="expense-list">
        {expenses.length === 0 ? (
          <div className="empty-state">No expenses found</div>
        ) : (
          expenses.map((expense) => (
            <article className="expense-item" key={expense.id}>
              <div>
                <h3>{expense.title}</h3>
                <p>
                  {expense.category} - {expense.date}
                </p>
                {expense.note && <p className="note">{expense.note}</p>}
              </div>
              <div className="expense-actions">
                <strong>
                  <IndianRupee size={15} />
                  {Number(expense.amount).toLocaleString("en-IN")}
                </strong>
                <button type="button" title="Edit expense" onClick={() => onEdit(expense)}>
                  <Edit size={17} />
                </button>
                <button type="button" title="Delete expense" onClick={() => onDelete(expense.id)}>
                  <Trash2 size={17} />
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default ExpenseHistory;

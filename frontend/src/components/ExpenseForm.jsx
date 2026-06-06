import React from "react";
import { Plus } from "lucide-react";
import { categories } from "../constants/categories";

function ExpenseForm({
  formData,
  editingId,
  errors,
  message,
  onChange,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <form className="expense-form" onSubmit={onSubmit}>
      <h2>{editingId ? "Edit Expense" : "Add Expense"}</h2>

      <label>
        Title
        <input name="title" value={formData.title} onChange={onChange} placeholder="Lunch" />
        {errors.title && <small>{errors.title}</small>}
      </label>

      <label>
        Amount
        <input name="amount" type="number" value={formData.amount} onChange={onChange} placeholder="250" />
        {errors.amount && <small>{errors.amount}</small>}
      </label>

      <label>
        Category
        <select name="category" value={formData.category} onChange={onChange}>
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <small>{errors.category}</small>}
      </label>

      <label>
        Date
        <input name="date" type="date" value={formData.date} onChange={onChange} />
        {errors.date && <small>{errors.date}</small>}
      </label>

      <label>
        Note
        <textarea name="note" value={formData.note} onChange={onChange} placeholder="Optional note" />
      </label>

      {message && <p className="message">{message}</p>}

      <div className="button-row">
        <button type="submit">
          <Plus size={18} />
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button type="button" className="secondary-btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;

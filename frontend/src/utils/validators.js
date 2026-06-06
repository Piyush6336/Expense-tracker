export function validateExpenseForm(formData) {
  const errors = {};

  if (!formData.title.trim()) errors.title = "Title is required";
  if (!formData.amount || Number(formData.amount) <= 0) errors.amount = "Enter a valid amount";
  if (!formData.category) errors.category = "Choose a category";
  if (!formData.date) errors.date = "Date is required";

  return errors;
}

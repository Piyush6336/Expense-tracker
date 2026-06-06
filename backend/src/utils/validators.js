function validateUser(data, isLogin = false) {
  const errors = {};

  if (!isLogin && (!data.name || data.name.trim() === "")) {
    errors.name = "Name is required";
  }

  if (!data.email || data.email.trim() === "") {
    errors.email = "Email is required";
  }

  if (!data.password || data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}

function validateExpense(data) {
  const errors = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required";
  }

  if (!data.amount || Number(data.amount) <= 0) {
    errors.amount = "Amount must be greater than 0";
  }

  if (!data.category || data.category.trim() === "") {
    errors.category = "Category is required";
  }

  if (!data.date) {
    errors.date = "Date is required";
  }

  return errors;
}

module.exports = { validateUser, validateExpense };

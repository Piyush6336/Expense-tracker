
import React, { useEffect, useState } from "react";
import { apiRequest } from "./api/apiClient";
import AuthPage from "./components/AuthPage";
import DashboardCards from "./components/DashboardCards";
import ExpenseCharts from "./components/ExpenseCharts";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseHistory from "./components/ExpenseHistory";
import Header from "./components/Header";
import { getLocalDateValue } from "./utils/date";
import { validateExpenseForm } from "./utils/validators";

const emptyForm = {
  title: "",
  amount: "",
  category: "",
  date: getLocalDateValue(),
  note: "",
};

function App() {
  const savedUser = localStorage.getItem("expenseUser");
  const savedToken = localStorage.getItem("expenseToken");
  const savedTheme = localStorage.getItem("expenseTheme");

  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);
  const [token, setToken] = useState(savedToken || "");
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [authErrors, setAuthErrors] = useState({});
  const [authMessage, setAuthMessage] = useState("");
  const [darkMode, setDarkMode] = useState(savedTheme === "dark");
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [dashboard, setDashboard] = useState({
    totalExpenses: 0,
    monthlyExpenses: 0,
    recentTransactions: [],
  });
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("expenseTheme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (token) {
      fetchExpenses();
      fetchAllExpenses();
      fetchDashboard();
    }
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) fetchExpenses();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, categoryFilter, token]);

  async function apiFetch(url, options = {}) {
    const response = await apiRequest(url, { ...options, token });

    if (response.status === 401) {
      handleLogout(false);
    }

    return response;
  }

  function handleAuthChange(event) {
    const { name, value } = event.target;
    setAuthForm({ ...authForm, [name]: value });
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    setAuthErrors({});
    setAuthMessage("");

    const response = await apiRequest(`/auth/${authMode}`, {
      method: "POST",
      body: authForm,
    });

    const data = await response.json();

    if (!response.ok) {
      setAuthErrors(data.errors || {});
      setAuthMessage(data.message || "Authentication failed");
      return;
    }

    localStorage.setItem("expenseToken", data.token);
    localStorage.setItem("expenseUser", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    setAuthForm({ name: "", email: "", password: "" });
  }

  async function handleLogout(callApi = true) {
    if (callApi && token) {
      await apiFetch("/auth/logout", { method: "POST" });
    }

    localStorage.removeItem("expenseToken");
    localStorage.removeItem("expenseUser");
    setToken("");
    setUser(null);
    setExpenses([]);
    setAllExpenses([]);
    setDashboard({ totalExpenses: 0, monthlyExpenses: 0, recentTransactions: [] });
  }

  async function fetchExpenses() {
    const query = new URLSearchParams();

    if (search) query.append("search", search);
    if (categoryFilter) query.append("category", categoryFilter);

    const response = await apiFetch(`/expenses?${query.toString()}`);
    const data = await response.json();
    setExpenses(data);
  }

  async function fetchAllExpenses() {
    const response = await apiFetch("/expenses");
    const data = await response.json();
    setAllExpenses(data);
  }

  async function fetchDashboard() {
    const response = await apiFetch("/dashboard");
    const data = await response.json();
    setDashboard(data);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function validateForm() {
    const newErrors = validateExpenseForm(formData);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    const url = editingId ? `/expenses/${editingId}` : "/expenses";
    const method = editingId ? "PUT" : "POST";

    const response = await apiFetch(url, {
      method,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors(data.errors || {});
      setMessage(data.message || "Something went wrong");
      return;
    }

    setFormData(emptyForm);
    setEditingId(null);
    setErrors({});
    setMessage(editingId ? "Expense updated" : "Expense added");
    fetchExpenses();
    fetchAllExpenses();
    fetchDashboard();
  }

  function startEdit(expense) {
    setEditingId(expense.id);
    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      note: expense.note || "",
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteExpense(id) {
    const confirmDelete = window.confirm("Delete this expense?");

    if (!confirmDelete) return;

    await apiFetch(`/expenses/${id}`, { method: "DELETE" });
    fetchExpenses();
    fetchAllExpenses();
    fetchDashboard();
    setMessage("Expense deleted");
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData(emptyForm);
    setErrors({});
  }

  if (!user) {
    return (
      <AuthPage
        authMode={authMode}
        authForm={authForm}
        authErrors={authErrors}
        authMessage={authMessage}
        darkMode={darkMode}
        onAuthChange={handleAuthChange}
        onAuthSubmit={handleAuthSubmit}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onToggleAuthMode={() => {
          setAuthMode(authMode === "login" ? "register" : "login");
          setAuthErrors({});
          setAuthMessage("");
        }}
      />
    );
  }

  return (
    <main className="app">
      <Header
        user={user}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onLogout={() => handleLogout()}
      />
      <DashboardCards dashboard={dashboard} />
      <ExpenseCharts expenses={allExpenses} />

      <section className="content-grid">
        <ExpenseForm
          formData={formData}
          editingId={editingId}
          errors={errors}
          message={message}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancelEdit={cancelEdit}
        />
        <ExpenseHistory
          expenses={expenses}
          search={search}
          categoryFilter={categoryFilter}
          onSearchChange={(event) => setSearch(event.target.value)}
          onCategoryChange={(event) => setCategoryFilter(event.target.value)}
          onEdit={startEdit}
          onDelete={deleteExpense}
        />
      </section>
    </main>
  );
}

export default App;

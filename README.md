# Expense Tracker

Full-stack Expense Tracker application built with React.js, Node.js, Express.js, and SQLite.

## Features

- User register, login, and logout
- Add, edit, delete, search, and filter expenses
- Dashboard with total expenses, monthly expenses, and recent transactions
- Category pie chart and last 6 months bar chart
- Dark mode
- Responsive UI

## Folder Structure

```txt
expense-tracker/
  backend/
    server.js
    src/
      config/
        database.js
      controllers/
        authController.js
        dashboardController.js
        expenseController.js
      middleware/
        authMiddleware.js
      routes/
        authRoutes.js
        dashboardRoutes.js
        expenseRoutes.js
      utils/
        date.js
        password.js
        validators.js
  frontend/
    src/
      api/
        apiClient.js
      components/
        AuthPage.jsx
        DashboardCards.jsx
        ExpenseCharts.jsx
        ExpenseForm.jsx
        ExpenseHistory.jsx
        Header.jsx
      constants/
        categories.js
      utils/
        date.js
        format.js
        validators.js
      App.jsx
      main.jsx
      styles.css
```

## Run Project

```bash
npm run install-all
npm run backend
npm run frontend
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

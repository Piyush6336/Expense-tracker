# Expense Tracker

A full-stack Expense Tracker application built with React.js, Node.js, Express.js, and SQLite.

## Features

* User Registration, Login, and Logout
* Add, Edit, Delete Expenses
* Search and Filter Expenses
* Dashboard Analytics
* Total Expenses Summary
* Monthly Expense Tracking
* Recent Transactions
* Category-wise Pie Chart
* Last 6 Months Expense Bar Chart
* Dark Mode Support
* Responsive Design

## Tech Stack

### Frontend

* React.js
* Vite
* CSS

### Backend

* Node.js
* Express.js

### Database

* SQLite

## Project Structure

```txt
expense-tracker/
│
├── backend/
│   ├── server.js
│   └── src/
│       ├── config/
│       │   └── database.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── dashboardController.js
│       │   └── expenseController.js
│       ├── middleware/
│       │   └── authMiddleware.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── dashboardRoutes.js
│       │   └── expenseRoutes.js
│       └── utils/
│           ├── date.js
│           ├── password.js
│           └── validators.js
│
└── frontend/
    └── src/
        ├── api/
        │   └── apiClient.js
        ├── components/
        │   ├── AuthPage.jsx
        │   ├── DashboardCards.jsx
        │   ├── ExpenseCharts.jsx
        │   ├── ExpenseForm.jsx
        │   ├── ExpenseHistory.jsx
        │   └── Header.jsx
        ├── constants/
        │   └── categories.js
        ├── utils/
        │   ├── date.js
        │   ├── format.js
        │   └── validators.js
        ├── App.jsx
        ├── main.jsx
        └── styles.css
```

## API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`
* POST `/api/auth/logout`

### Expenses

* GET `/api/expenses`
* POST `/api/expenses`
* PUT `/api/expenses/:id`
* DELETE `/api/expenses/:id`

### Dashboard

* GET `/api/dashboard`

## Local Setup

### Clone Repository

```bash
git clone https://github.com/Piyush6336/Expense-tracker.git
cd Expense-tracker
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Live Demo

Frontend: https://YOUR-VERCEL-URL.vercel.app

Backend: https://expense-tracker-do95.onrender.com

## Author

Piyush Arya

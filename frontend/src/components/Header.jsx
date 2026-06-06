import React from "react";
import { LogOut, Moon, Sun, User } from "lucide-react";

function Header({ user, darkMode, onToggleTheme, onLogout }) {
  return (
    <section className="top-bar">
      <div>
        <p className="eyebrow">Expense Tracker</p>
        <h1>Manage daily spending</h1>
        <p className="hero-text">Track spending, compare categories, and review recent expenses in one place.</p>
      </div>
      <div className="top-actions">
        <span className="user-pill">
          <User size={16} />
          {user.name}
        </span>
        <button type="button" className="theme-btn" onClick={onToggleTheme}>
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? "Light" : "Dark"}
        </button>
        <button type="button" className="logout-btn" onClick={onLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </section>
  );
}

export default Header;

import React from "react";
import { Moon, Sun, User, WalletCards } from "lucide-react";

function AuthPage({
  authMode,
  authForm,
  authErrors,
  authMessage,
  darkMode,
  onAuthChange,
  onAuthSubmit,
  onToggleAuthMode,
  onToggleTheme,
}) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <button type="button" className="theme-btn auth-theme" onClick={onToggleTheme}>
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? "Light" : "Dark"}
        </button>

        <div className="auth-brand">
          <WalletCards size={34} />
          <div>
            <p className="eyebrow">Expense Tracker</p>
            <h1>{authMode === "login" ? "Welcome back" : "Create account"}</h1>
          </div>
        </div>

        <form onSubmit={onAuthSubmit}>
          {authMode === "register" && (
            <label>
              Name
              <input name="name" value={authForm.name} onChange={onAuthChange} placeholder="Your name" />
              {authErrors.name && <small>{authErrors.name}</small>}
            </label>
          )}

          <label>
            Email
            <input
              name="email"
              type="email"
              value={authForm.email}
              onChange={onAuthChange}
              placeholder="you@example.com"
            />
            {authErrors.email && <small>{authErrors.email}</small>}
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={authForm.password}
              onChange={onAuthChange}
              placeholder="Minimum 6 characters"
            />
            {authErrors.password && <small>{authErrors.password}</small>}
          </label>

          {authMessage && <p className="message error-message">{authMessage}</p>}

          <button type="submit" className="full-btn">
            <User size={18} />
            {authMode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <button type="button" className="link-btn" onClick={onToggleAuthMode}>
          {authMode === "login" ? "New user? Create an account" : "Already have an account? Login"}
        </button>
      </section>
    </main>
  );
}

export default AuthPage;

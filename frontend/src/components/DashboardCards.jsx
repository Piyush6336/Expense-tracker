import React from "react";
import { CalendarDays, WalletCards } from "lucide-react";
import { formatMoney } from "../utils/format";

function DashboardCards({ dashboard }) {
  return (
    <section className="dashboard-grid">
      <div className="stat-card">
        <WalletCards size={28} />
        <div>
          <span>Total Expenses</span>
          <strong>{formatMoney(dashboard.totalExpenses)}</strong>
        </div>
      </div>
      <div className="stat-card">
        <CalendarDays size={28} />
        <div>
          <span>This Month</span>
          <strong>{formatMoney(dashboard.monthlyExpenses)}</strong>
        </div>
      </div>
      <div className="recent-box">
        <span>Recent Transactions</span>
        {dashboard.recentTransactions.length === 0 ? (
          <p>No expenses yet</p>
        ) : (
          dashboard.recentTransactions.map((item) => (
            <p key={item.id}>
              {item.title} <b>{formatMoney(item.amount)}</b>
            </p>
          ))
        )}
      </div>
    </section>
  );
}

export default DashboardCards;

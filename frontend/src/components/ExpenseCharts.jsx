import React from "react";
import { BarChart3, PieChart } from "lucide-react";
import { categories, categoryColors } from "../constants/categories";
import { getMonthKey } from "../utils/date";
import { formatMoney } from "../utils/format";

function ExpenseCharts({ expenses }) {
  const categoryData = getCategoryData(expenses);
  const monthlyData = getMonthlyData(expenses);
  const highestMonthAmount = Math.max(...monthlyData.map((item) => item.total), 1);

  return (
    <section className="charts-grid">
      <div className="chart-panel">
        <div className="section-title">
          <PieChart size={22} />
          <h2>Category Breakdown</h2>
        </div>

        <div className="pie-layout">
          <div className="pie-chart" style={getPieChartStyle(categoryData)}>
            <span>{categoryData.length === 0 ? "0%" : "100%"}</span>
          </div>
          <div className="legend-list">
            {categoryData.length === 0 ? (
              <p className="muted-text">Add expenses to see category share.</p>
            ) : (
              categoryData.map((item) => (
                <div className="legend-item" key={item.category}>
                  <span style={{ background: item.color }}></span>
                  <p>{item.category}</p>
                  <strong>{formatMoney(item.total)}</strong>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="chart-panel">
        <div className="section-title">
          <BarChart3 size={22} />
          <h2>Last 6 Months</h2>
        </div>

        <div className="bar-chart">
          {monthlyData.map((item) => (
            <div className="bar-item" key={item.monthName}>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ height: `${Math.max((item.total / highestMonthAmount) * 100, 4)}%` }}
                  title={formatMoney(item.total)}
                ></div>
              </div>
              <span>{item.monthName}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getCategoryData(expenses) {
  const totals = categories.map((category) => {
    const total = expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);

    return { category, total, color: categoryColors[category] };
  });

  return totals.filter((item) => item.total > 0);
}

function getPieChartStyle(categoryData) {
  const total = categoryData.reduce((sum, item) => sum + item.total, 0);
  let start = 0;

  if (total === 0) {
    return { background: "#e2e8f0" };
  }

  const parts = categoryData.map((item) => {
    const percent = (item.total / total) * 100;
    const end = start + percent;
    const chartPart = `${item.color} ${start}% ${end}%`;
    start = end;
    return chartPart;
  });

  return { background: `conic-gradient(${parts.join(", ")})` };
}

function getMonthlyData(expenses) {
  const today = new Date();

  return Array.from({ length: 6 }).map((_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() - (5 - index), 1);
    const monthKey = getMonthKey(date);
    const monthName = date.toLocaleString("en-IN", { month: "short" });
    const total = expenses
      .filter((expense) => expense.date.slice(0, 7) === monthKey)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);

    return { monthName, total };
  });
}

export default ExpenseCharts;

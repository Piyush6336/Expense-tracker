export function formatMoney(amount) {
  return Number(amount).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

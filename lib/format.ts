const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** 1499 -> "₹1,499" */
export function inr(amount: number): string {
  return formatter.format(amount);
}

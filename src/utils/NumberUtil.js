export const toIndianCurrency = (num) => {
  const curr = num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return curr;
};

export const formatAmount = amount => {
  return amount.toFixed(2);
}

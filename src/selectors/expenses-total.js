
export const getExpensesTotal = (expenses) => expenses.reduce((acc, { amount }) => acc + amount, 0);
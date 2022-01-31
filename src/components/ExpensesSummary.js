import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal, allExpensesTotal, expenses }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses' ;
  let formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
  const expenseFullWord = expenses - expenseCount === 1 ? 'expense' : 'expenses';
  const formattedHiddenExpenses = numeral((allExpensesTotal - expensesTotal) / 100).format('$0,0.00');
  const formattedAllExpenses = numeral(allExpensesTotal / 100).format('$0,0.00');
  const hiddenExpenseCount = expenses.length - expenseCount;
  
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
        {expensesTotal !== allExpensesTotal && 
          <h3 className="page-header__subtitle">There {hiddenExpenseCount === 1 ? 'is ' : 'are '} 
          <span>{hiddenExpenseCount}</span> hidden {hiddenExpenseCount === 1 ? 'expense ' : 'expenses '} 
          totalling <span>{formattedHiddenExpenses}</span></h3>}
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  );
};

const resetFilter = () => {
  expensesTotal = allExpensesTotal;
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses),
    allExpensesTotal: selectExpensesTotal(state.expenses),
    expenses: state.expenses
  };
};

export default connect(mapStateToProps)(ExpensesSummary);

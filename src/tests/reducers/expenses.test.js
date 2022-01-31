import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type : '@@INIT'});

    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove any expense if id does not exist', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '4'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        id: '4',
        description : 'AirBnB',
        note: '',
        amount: 400,
        createdAt: 0
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
    const updates = {
        description : 'Updated description',
        note: '',
        amount: 500,
        createdAt: 1000
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id:'3',
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state[2]).toEqual({id: '3', ...updates});
});

test('should not edit any expense if the id does not exist', () => {
    const updates = {
        description : 'Updated description',
        note: '',
        amount: 500,
        createdAt: 1000
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id:'4',
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses:[expenses[1]]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});
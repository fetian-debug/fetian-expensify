import getVisibleExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should filter by text value', () => {
    const filters = {
        text: 't',
        sortBy: 'date', 
        startDate: undefined,
        endDate: undefined
    };
    const result = getVisibleExpenses(expenses,filters); // here we need to call it with correct data, so we need expeses array
    expect(result).toEqual([ expenses[1], expenses[2] ]);
});

test('should filter by startDate value', () => {
    const filters = {
        startDate: moment(0),
        text: '',
        sortBy: 'date',
        endDate: undefined
    };
    const result = getVisibleExpenses(expenses,filters);
    expect(result).toEqual([expenses[1], expenses[0]]);
});

test('should filter by endDate value', () => {
    const filters = {
        endDate: moment(0).subtract('2', 'days'),
        startDate: undefined,
        text: '',
        sortBy: 'date',
    };
    const result = getVisibleExpenses(expenses,filters);
    expect(result).toEqual([expenses[2]]);
});


test('should filter sort by date', () => {
    const filters = {
        sortBy: 'date',
        text: '',
        startDate: undefined,
        endDate: undefined
    };

    const result = getVisibleExpenses(expenses,filters);
    expect(result).toEqual([expenses[1], expenses[0], expenses[2]]);
});

test('should filter sort by amount', () => {
    const filters = {
        sortBy: 'amount',
        text: '',
        startDate: undefined,
        endDate: undefined
    };

    const result = getVisibleExpenses(expenses,filters);
    expect(result).toEqual([expenses[2], expenses[1], expenses[0]]);
});
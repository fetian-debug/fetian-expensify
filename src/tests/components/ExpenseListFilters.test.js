import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";

import {filters, altFilters } from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />);
});

test('Should render ExpenseListFilter properly', ()=>{
    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseListFilter properly altFilters', ()=>{
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('Should handle text change', () => {
    const value = "rent";
    wrapper.find('input').simulate('change', {target : { value }});
    expect(setTextFilter).toHaveBeenCalledWith(value);
});

test('Should sort by date', () => {
    const value = 'date'
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', { target : { value }});
    expect(sortByDate).toHaveBeenCalled();

});

test('Should sort by amount', () => {
    const value = 'amount'
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', { target : { value }});
    expect(sortByAmount).toHaveBeenCalled();

});

test('Should handle date changes', () => {
    const startDate = moment(0).add(5, 'days');
    const endDate = moment(0).add(7, 'years');
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenCalledWith(startDate);
    expect(setEndDate).toHaveBeenCalledWith(endDate);

});

test('Should handle date focus changes', () => {
    const calendarFocus = 'endDate';
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocus);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocus);

});
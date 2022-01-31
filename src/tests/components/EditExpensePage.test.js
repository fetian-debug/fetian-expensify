import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage} from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let startEditExpense, history, startRemoveExpense, wrapper;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage 
            expense={expenses[0]}
            startEditExpense={startEditExpense} 
            startRemoveExpense={startRemoveExpense}
            history={history}
        />);
});

test('Should render EditExpensePage properly', ()=> {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle editExepense',()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[1]);
});

test('Should handle removeExepense',()=>{
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[0].id);
});
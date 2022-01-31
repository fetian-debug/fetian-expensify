import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';
import Modal from 'react-modal';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
	startEditExpense = jest.fn();
	startRemoveExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditExpensePage
			startEditExpense={startEditExpense}
			startRemoveExpense={startRemoveExpense}
			history={history}
			expense={expenses[2]}
		/>
	);
});

test('should render EditExpensePage', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

// test('should open react-modal component', () => {
// 	const wrapper = mount(
//     <Modal
//       isOpen={this.state.modalIsOpen}
//       onRequestClose={this.closeModal}
//       contentLabel="Remove Expense"
//       style={customStyles}
//     >
// 		</Modal>
//   );
//   wrapper.find('.button__success').simulate('click');
//   expect
// });

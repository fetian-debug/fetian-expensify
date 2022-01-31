import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : 'auto',
    padding               : '10px 30px 30px 30px',
    borderWidth           : '3px',
    borderRadius          : '10px'
    
  }
};

Modal.setAppElement(document.getElementById('app'));
export class EditExpensePage extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
    closeModal();
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
        </div>
        <div className="button__container">
          <button className="button__secondary" onClick={this.openModal}>Remove Expense</button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Remove Expense"
          style={customStyles}
        >
        <div className="modal">
          <h2>Remove the '{this.props.expense.description}' expense?</h2>
          <p>Are you sure you want to remove the {this.props.expense.description} expense?</p>
          <p>Warning: This cannot be undone!</p>
          <div className="button-modal__container">
            <button className="button__success" onClick={this.closeModal && this.onRemove}>Yes</button>
            <button className="button__fail" onClick={this.closeModal}>No</button>
          </div>
        </div>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

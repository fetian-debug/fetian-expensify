import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? props.expense.amount : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: undefined
        };

    };

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(()=>({description}));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(()=>({note}));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if ( amount.match(/^\d{1,}(\.\d{0,2})?$/) ) {
            this.setState(() => ({amount}));
        }
    };

    onDateChange = (createdAt) => {
        this.setState(() => ({createdAt}));
    };

    onCalendarFocusedChange = ({focused}) => {
        this.setState(() => ({calendarFocused : focused}));
    };

    addExpense = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount) {
            this.setState(() => ({error: 'Please enter a description and an amount for your expense!'}));
        } else {
             this.setState(() => ({error:undefined}));
             this.props.onSubmit({
                 description: this.state.description,
                 amount: parseFloat(this.state.amount, 10) * 100,
                 createdAt: this.state.createdAt.valueOf(),
                 note: this.state.note
             });
        }
    };

    render() {
        return (
            <form className='form' onSubmit={this.addExpense}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    className="text-input"
                    type='text'
                    placeholder='Description'
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    className="text-input"
                    type='number'
                    placeholder='Amount'
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onCalendarFocusedChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false }
                />
                <textarea
                        className="textarea"
                    placeholder='Add a note for your expense (optional)'
                    value={this.state.note}
                    onChange={this.onNoteChange}
                />
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        );
    }
};
import {
    addExpense, 
    editExpense, 
    removeExpense, 
    startAddExpense, 
    setExpenses, 
    startSetExpense,
    startRemoveExpense,
    startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

const expensesData = {};
const uid="123abc";
const defaultAuthState = { auth: { uid } }; 

expenses.forEach(({amount, createdAt, description, id, note}) => {
    expensesData[id] = {description,amount,createdAt,note};
});

beforeEach((done) => {
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
})

test('should setup remove expense action object',() =>{
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        id: '123abc',
        type: 'REMOVE_EXPENSE'
        
    });
});


test('should setup edit expense action object', () => {
    const action = editExpense('123abc',{description: 'description test', amount: '123456', createdAt: '1/1/2019'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        update: {
            description: 'description test',
            amount: '123456',
            createdAt: '1/1/2019'
        }
    });
});

// test('should setup add expense action with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense:{
//             description: '',
//             amount: 0,
//             createdAt: 0,
//             note: '',
//             id: expect.any(String)
//         }
//     });
// });

test('should setup add expense action with passed values', () => {
    const expense = expenses[1] ;
    const action = addExpense(expense);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
        ...expense
        }
    });

});

test('should setup startAddExpense with default values which dispatch addExpense, save in database', () => {
    const expense = {
        description: '',
        createdAt: 0,
        amount: 0,
        note: ''
    };
    const store = createMockStore(defaultAuthState) ;

    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense:{
                id: expect.any(String),
                ...expense
            } 
        });

       return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');


    }).then((snapshot) => {
           expect(snapshot.val()).toEqual(expense);
            done();

        });

});

test('should setup startAddExpense with passed values which dispatch addExpense, save in database', (done) => {
    const expense = {
        description: 'keyboard',
        createdAt: 1020,
        amount: 2900,
        note: 'with lights'
    };
        const store = createMockStore(defaultAuthState) ;

    store.dispatch(startAddExpense(expense)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense:{
                id: expect.any(String),
                ...expense
            } 
        });

       return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');


    }).then((snapshot) => {
           expect(snapshot.val()).toEqual(expense);
            done();

        });

});

test('should return set expense action object', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses

    })
});

test('should startSetExpense by getting data from db', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpense()).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: "SET_EXPENSES",
            expenses
        });
        done();
    })

});

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startRemoveExpense({id: expenses[0].id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({type: 'REMOVE_EXPENSE', id: expenses[0].id});
        return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value');        
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done(); 

    });

});

test('should startEditExpense from db', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startEditExpense(expenses[0].id,{description: 'updated'})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: expenses[0].id,
            update: {
                description: 'updated',
            }
            
        }); 
        return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().description).toEqual('updated');
        done();
    });

});

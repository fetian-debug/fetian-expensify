import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { database } from '../../firebase/firebase';
import { 
    addExpense,
    editExpense, 
    removeExpense, 
    startAddExpense, 
    setExpenses,
    startSetEnpenses, 
    startRemoveExpense, 
    startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const uid = "testUidkalmde";
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expenseData[id] = {description, note, amount, createdAt};
    });
    database.ref(`users/${uid}/expenses`).set(expenseData).then(()=> done());
} );

test ('should setup remove expense action', () => {
    const action = removeExpense('dand3ad');
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id : 'dand3ad'
    });
});

test('should remove expense from database and store', (done) => {
    const store = createMockStore({ auth: { uid } });
    store.dispatch(startRemoveExpense(expenses[0].id)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "REMOVE_EXPENSE",
            id: expenses[0].id
        })
        return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toBeNull();
        done();
    });
});

test ('should setup edit expense action', () => {
    const action = editExpense('djad23dj', {note: 'new note', description:'new description'});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id : 'djad23dj',
        updates: {note: 'new note', description:'new description'}
    });
});

test('should update expense in database and store', (done) => {
    const store = createMockStore({ auth: { uid } });
    const updates = {note: 'new note', description:'new description'};
    store.dispatch(startEditExpense(expenses[0].id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "EDIT_EXPENSE",
            id : expenses[0].id,
            updates
        })
        return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().note).toEqual(updates.note);
        expect(snapshot.val().description).toEqual(updates.description);
        done();
    });
});

test('should setup add expense action object with provided values', () => {

    const action = addExpense(expenses[2]);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({ auth: { uid } });
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});



test('should add expense to database and store with default values', (done) => {
    const store = createMockStore({ auth: { uid } });
    const expenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
    
});


test('should setup set expenses action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({ auth: { uid } });
    store.dispatch(startSetEnpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'SET_EXPENSES',
            expenses
        });
        done();
    })
});

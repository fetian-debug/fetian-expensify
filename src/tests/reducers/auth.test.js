import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
    const action = {
        type: 'LOGIN',
        uid: 'adjd!5de'
    }
    const state = authReducer({}, action);
    expect(state.uid).toEqual(action.uid);
});


test('should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({uid: 'whatever'}, action);
    expect(state).toEqual({});
});
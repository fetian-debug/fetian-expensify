import { TestScheduler } from 'jest';
import { login, logout } from '../../actions/auth';

test('should generate login action object', () => {
    const uid = 'lakd!5de';
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});


test('should generate logout action object', () => {
    const action = logout();
    expect(action).toEqual({type: 'LOGOUT'});

});
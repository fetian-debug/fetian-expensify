import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should correctly render LoginPage', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
  const startLoginGoogle = jest.fn();
  const wrapper = shallow(<LoginPage startLoginGoogle={startLoginGoogle} />);
  wrapper.find('.button__login--google').simulate('click');
  expect(startLoginGoogle).toHaveBeenCalled();
});

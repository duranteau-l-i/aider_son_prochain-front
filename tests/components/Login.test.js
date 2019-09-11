import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../src/store';
import Login from '../../src/components/Login';
import LoginContainer from '../../src/containers/Login';

describe('Login', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <LoginContainer />
        </Router>
      </Provider>,
    );
  });

  it('renders a container component', () => {
    expect(wrapper.find(LoginContainer).length).to.equal(1);
  });

  it('renders a display component', () => {
    expect(wrapper.find(Login).length).to.equal(1);
  });

  it('renders a display component', () => {
    expect(wrapper.find('.container')).to.have.lengthOf(1);
  });
});

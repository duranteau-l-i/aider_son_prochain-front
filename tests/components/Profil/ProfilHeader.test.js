import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../../src/store';
import Donor from '../../../src/components/Profil/Donor';

import { currentUser } from '../../__mocks__/currentUser';

describe('Profil header', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <Donor currentUser={currentUser} />
        </Router>
      </Provider>,
    );
  });

  it('renders a display component', () => {
    expect(wrapper.find(Donor).length).to.equal(1);
  });
});

import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../../src/store';
import Beneficiary from '../../../src/components/ProfilUpdate/Beneficiary';

describe('Profil Update Beneficiary', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <Beneficiary />
        </Router>
      </Provider>,
    );
  });

  it('renders a container component', () => {
    expect(wrapper.find(Beneficiary).length).to.equal(1);
  });
});

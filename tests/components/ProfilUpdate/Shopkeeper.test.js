import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../../src/store';
import Shopkeeper from '../../../src/components/ProfilUpdate/Shopkeeper';

import { shopkeeper } from '../../__mocks__/shopkeeper';

describe('Profil Update Shopkeeper', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <Shopkeeper currentUser={{ user: shopkeeper }} />
        </Router>
      </Provider>,
    );
  });

  it('renders a container component', () => {
    expect(wrapper.find(Shopkeeper).length).to.equal(1);
  });
});

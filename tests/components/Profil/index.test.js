import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../../src/store';
import Profil from '../../../src/components/Profil';
import ProfilContainer from '../../../src/containers/Profil';

describe('Profil', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <ProfilContainer />
        </Router>
      </Provider>,
    );
  });

  it('renders a container component', () => {
    expect(wrapper.find(ProfilContainer).length).to.equal(1);
  });

  it('renders a display component', () => {
    expect(wrapper.find(Profil).length).to.equal(1);
  });

  it('renders a display component', () => {
    expect(wrapper.find('.container')).to.have.lengthOf(1);
  });
});

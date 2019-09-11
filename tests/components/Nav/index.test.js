import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import Nav from '../../../src/components/Nav';

import { currentUser } from '../../__mocks__/currentUser';

describe('Nav', () => {
  it('should render component', () => {
    const wrapper = shallow(
      <Router>
        <Nav currentUser={currentUser} role="donor" deconnexion={sinon.spy()} match={{}} />
      </Router>,
    );

    expect(wrapper.render()).to.have.lengthOf(1);
  });
});

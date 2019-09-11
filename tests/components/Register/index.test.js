import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import Register from '../../../src/components/Register';

describe('Register', () => {
  it('should render component', () => {
    const wrapper = shallow(
      <Router>
        <Register value="value" submitRegister={sinon.spy()} />
      </Router>,
    );

    expect(wrapper.render()).to.have.lengthOf(1);
  });
});

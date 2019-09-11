import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Currentuser from '../../../src/components/Nav/Currentuser';

import { currentUser } from '../../__mocks__/currentUser';

describe('Currentuser', () => {
  it('should render component', () => {
    const wrapper = shallow(
      <Currentuser currentUser={currentUser} role="donor" deconnexion={sinon.spy()} />,
    );

    expect(wrapper.find('.nav-item')).to.have.lengthOf(1);
  });
});

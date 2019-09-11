import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import ProfilUpdate from '../../../src/components/ProfilUpdate';

import { currentUser } from '../../__mocks__/currentUser';

describe('ProfilUpdate', () => {
  it('should render component', () => {
    const wrapper = shallow(<ProfilUpdate currentUser={currentUser} role="donor" token="token" />);

    expect(wrapper.find('.container')).to.have.lengthOf(1);
  });
});

import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Donor from '../../../src/components/Profil/Donor';

import { donor } from '../../__mocks__/donor';

describe('Profil Donor', () => {
  it('should render component', () => {
    const wrapper = shallow(<Donor currentUser={donor} role="donor" />);

    expect(wrapper.find('.profile-group')).to.have.lengthOf(4);
  });
});

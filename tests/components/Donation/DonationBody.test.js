import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import DonationBody from '../../../src/components/Donation/DonationBody';

import { currentUser } from '../../__mocks__/currentUser';
import { donations } from '../../__mocks__/donations';

describe('DonationBody', () => {
  it('should render component', () => {
    const wrapper = shallow(<DonationBody currentUser={currentUser} donation={donations[0]} />);

    expect(wrapper.find('.donation')).to.have.lengthOf(1);
  });
});

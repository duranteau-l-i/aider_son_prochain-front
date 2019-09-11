import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Donation from '../../../src/components/Donation';

import { currentUser } from '../../__mocks__/currentUser';
import { donations } from '../../__mocks__/donations';

describe('Donation', () => {
  it('should render component', () => {
    const wrapper = shallow(
      <Donation
        role="donor"
        token="token"
        currentUser={currentUser}
        donations={donations}
        getDonations={sinon.spy()}
        validateDonation={sinon.spy()}
      />,
    );

    expect(wrapper.find('.container')).to.have.lengthOf(1);
  });
});

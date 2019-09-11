import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Beneficiary from '../../../src/components/Beneficiary';

import { currentUser } from '../../__mocks__/currentUser';

describe('Beneficiary', () => {
  it('should render component', () => {
    const wrapper = shallow(
      <Beneficiary role="beneficiary" token="token" currentUser={currentUser} />,
    );

    expect(wrapper.find('.beneficiaries')).to.have.lengthOf(1);
  });
});

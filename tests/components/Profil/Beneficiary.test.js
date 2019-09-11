import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Beneficiary from '../../../src/components/Profil/Beneficiary';

import { beneficiary } from '../../__mocks__/beneficiary';

describe('Profil Beneficiary', () => {
  it('should render component', () => {
    const wrapper = shallow(<Beneficiary beneficiary={beneficiary} role="beneficiary" />);

    expect(wrapper.find('.profile-group')).to.have.lengthOf(4);
  });
});

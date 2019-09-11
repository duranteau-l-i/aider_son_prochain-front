import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Beneficiary from '../../../src/components/Register/Beneficiary';

describe('Beneficiary Register', () => {
  it('should render component', () => {
    const wrapper = shallow(
      <Beneficiary value="value" onChange={sinon.spy()} onSelect={sinon.spy()} />,
    );

    expect(wrapper.find('.form-group')).to.have.lengthOf(1);
  });
});

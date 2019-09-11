import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import RegisterDropdown from '../../../src/components/Nav/RegisterDropdown';

describe('RegisterDropdown', () => {
  it('should render component', () => {
    const wrapper = shallow(<RegisterDropdown />);
    expect(wrapper.find('.nav-item')).to.have.lengthOf(1);
  });
});

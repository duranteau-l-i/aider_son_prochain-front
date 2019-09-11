import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import EmptyState from '../../src/components/EmptyState';

describe('EmptyState', () => {
  it('should render component', () => {
    const wrapper = shallow(<EmptyState message="" link="" className="" />);

    expect(wrapper.find('.emptyState')).to.have.lengthOf(1);
  });
});

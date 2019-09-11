import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Contact from '../../src/components/Contact';

describe('Contact', () => {
  it('should render component', () => {
    const wrapper = shallow(<Contact />);

    expect(wrapper.find('.container')).to.have.lengthOf(1);
  });
});

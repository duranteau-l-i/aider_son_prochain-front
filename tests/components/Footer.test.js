import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Footer from '../../src/components/Footer';

describe('Footer', () => {
  it('should render component', () => {
    const wrapper = shallow(<Footer />);

    expect(wrapper.find('#sticky-footer')).to.have.lengthOf(1);
  });
});

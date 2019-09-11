import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Header from '../../src/components/Header';

describe('Header', () => {
  it('should render component', () => {
    const wrapper = shallow(<Header page="home" title="title" subtitle="subtitle" />);

    expect(wrapper.find('.home-header')).to.have.lengthOf(1);
  });
});

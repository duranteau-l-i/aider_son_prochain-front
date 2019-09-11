import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Home from '../../src/components/Home';

describe('Home', () => {
  it('should render component', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find('#qui-sommes-nous')).to.have.lengthOf(1);
  });
});

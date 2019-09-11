import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Input from '../../src/components/Input';

describe('Input', () => {
  it('should render component', () => {
    const wrapper = shallow(<Input type="text" label="test" name="test" />);

    expect(wrapper.find('.form-group')).to.have.lengthOf(1);
  });
});

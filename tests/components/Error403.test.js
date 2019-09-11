import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Error403 from '../../src/components/Error403';

describe('Error403', () => {
  it('should render component', () => {
    const wrapper = shallow(<Error403 />);

    expect(wrapper.find('.container')).to.have.lengthOf(1);
  });
});

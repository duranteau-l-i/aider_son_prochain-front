import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Error404 from '../../src/components/Error404';

describe('Error404', () => {
  it('should render component', () => {
    const wrapper = shallow(<Error404 />);

    expect(wrapper.find('.container')).to.have.lengthOf(1);
  });
});

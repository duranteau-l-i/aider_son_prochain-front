import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Shopkeeper from '../../../src/components/Register/Shopkeeper';

describe('Shopkeeper Register', () => {
  it('should render component', () => {
    const wrapper = shallow(
      <Shopkeeper value="value" onChange={sinon.spy()} onSelect={sinon.spy()} />,
    );

    expect(wrapper.find('.topSectionH3')).to.have.lengthOf(1);
  });
});

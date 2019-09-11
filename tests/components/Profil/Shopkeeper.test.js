import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Shopkeeper from '../../../src/components/Profil/Shopkeeper';

import { shopkeeper } from '../../__mocks__/shopkeeper';
import { currentUser } from '../../__mocks__/currentUser';

describe('Profil Shopkeeper', () => {
  it('should render component', () => {
    const wrapper = shallow(
      <Shopkeeper currentUser={{ user: shopkeeper }} role="shopkeeper" getProducts={sinon.spy()} />,
    );

    expect(wrapper.find('.profile-group')).to.have.lengthOf(1);
  });
});

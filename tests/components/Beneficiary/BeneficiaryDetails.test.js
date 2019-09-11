import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../../src/store';
import BeneficiaryDetails from '../../../src/components/Beneficiary/BeneficiaryDetails';

import { beneficiary } from '../../__mocks__/beneficiary';
import { currentUser } from '../../__mocks__/currentUser';

describe('BeneficiaryDetails', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <BeneficiaryDetails
            beneficiary={beneficiary}
            currentUser={currentUser}
            getBeneficiary={sinon.spy}
          />
        </Router>
      </Provider>,
    );
  });

  it('renders a display component', () => {
    expect(wrapper.find(BeneficiaryDetails).length).to.equal(1);
  });

  it('renders a display component with content', () => {
    expect(wrapper.find('.container')).to.have.lengthOf(1);
  });
});

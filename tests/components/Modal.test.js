import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Modal from '../../src/components/Modal';

describe('Modal', () => {
  it('should render component', () => {
    const wrapper = shallow(
      <Modal
        success={true}
        error={false}
        modalShow={sinon.spy()}
        title="title"
        message="message"
        messageError="message error"
        page="profil"
      />,
    );

    expect(wrapper.find('.modal')).to.have.lengthOf(1);
  });
});

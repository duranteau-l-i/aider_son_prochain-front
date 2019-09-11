import sinon from 'sinon';
import thunk from 'redux-thunk';

import {
  GET_DONATIONS,
  SEND_DONATION,
  VALIDATE_DONATION,
} from '../../../src/store/actionMiddleware';

const create = () => {
  const store = {
    getState: sinon.spy(() => ({})),
    dispatch: sinon.spy(),
  };
  const next = sinon.spy();

  const invoke = action => thunk(store)(next)(action);

  return { store, next, invoke };
};

describe('Donation Middleware', () => {
  it('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    next.should.have.been.calledWith(action);
  });

  it('passes dispatch and getState with GET_DONATIONS', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch(GET_DONATIONS);
      getState();
    });

    store.dispatch.should.have.been.calledWith(GET_DONATIONS);
  });
  it('passes dispatch and getState with SEND_DONATION', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch(SEND_DONATION);
      getState();
    });

    store.dispatch.should.have.been.calledWith(SEND_DONATION);
  });
  it('passes dispatch and getState with VALIDATE_DONATION', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch(VALIDATE_DONATION);
      getState();
    });

    store.dispatch.should.have.been.calledWith(VALIDATE_DONATION);
  });
});

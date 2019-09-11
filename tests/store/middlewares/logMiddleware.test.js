import sinon from 'sinon';
import thunk from 'redux-thunk';

import { SUBMIT_LOGIN, SUBMIT_REGISTER, DECONNEXION } from '../../../src/store/actionMiddleware';

const create = () => {
  const store = {
    getState: sinon.spy(() => ({})),
    dispatch: sinon.spy(),
  };
  const next = sinon.spy();

  const invoke = action => thunk(store)(next)(action);

  return { store, next, invoke };
};

describe('Log Middleware', () => {
  it('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    next.should.have.been.calledWith(action);
  });

  it('passes dispatch and getState with SUBMIT_LOGIN', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch(SUBMIT_LOGIN);
      getState();
    });

    store.dispatch.should.have.been.calledWith(SUBMIT_LOGIN);
  });
  it('passes dispatch and getState with SUBMIT_REGISTER', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch(SUBMIT_REGISTER);
      getState();
    });

    store.dispatch.should.have.been.calledWith(SUBMIT_REGISTER);
  });
  it('passes dispatch and getState with DECONNEXION', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch(DECONNEXION);
      getState();
    });

    store.dispatch.should.have.been.calledWith(DECONNEXION);
  });
});

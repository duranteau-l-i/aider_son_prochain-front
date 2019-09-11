import sinon from 'sinon';
import thunk from 'redux-thunk';

import { GET_BENEFICIARY } from '../../../src/store/actionMiddleware';

const create = () => {
  const store = {
    getState: sinon.spy(() => ({})),
    dispatch: sinon.spy(),
  };
  const next = sinon.spy();

  const invoke = action => thunk(store)(next)(action);

  return { store, next, invoke };
};

describe('Beneficiary Middleware', () => {
  it('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    next.should.have.been.calledWith(action);
  });

  it('passes dispatch and getState with GET_BENEFICIARY', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch(GET_BENEFICIARY);
      getState();
    });

    store.dispatch.should.have.been.calledWith(GET_BENEFICIARY);
  });
});

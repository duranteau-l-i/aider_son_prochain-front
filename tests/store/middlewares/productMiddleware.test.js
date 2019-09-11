import sinon from 'sinon';
import thunk from 'redux-thunk';

import { DELETE_PRODUCT, EDIT_PRODUCT } from '../../../src/store/actionMiddleware';

const create = () => {
  const store = {
    getState: sinon.spy(() => ({})),
    dispatch: sinon.spy(),
  };
  const next = sinon.spy();

  const invoke = action => thunk(store)(next)(action);

  return { store, next, invoke };
};

describe('Product Middleware', () => {
  it('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    next.should.have.been.calledWith(action);
  });

  it('passes dispatch and getState with DELETE_PRODUCT', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch(DELETE_PRODUCT);
      getState();
    });

    store.dispatch.should.have.been.calledWith(DELETE_PRODUCT);
  });
  it('passes dispatch and getState with EDIT_PRODUCT', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch(EDIT_PRODUCT);
      getState();
    });

    store.dispatch.should.have.been.calledWith(EDIT_PRODUCT);
  });
});

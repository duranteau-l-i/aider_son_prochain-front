import sinon from 'sinon';
import thunk from 'redux-thunk';

import { UPDATE_PROFIL } from '../../../src/store/actionMiddleware';

const create = () => {
  const store = {
    getState: sinon.spy(() => ({})),
    dispatch: sinon.spy(),
  };
  const next = sinon.spy();

  const invoke = action => thunk(store)(next)(action);

  return { store, next, invoke };
};

describe('Update Middleware', () => {
  it('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    next.should.have.been.calledWith(action);
  });

  it('passes dispatch and getState with UPDATE_PROFIL', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch(UPDATE_PROFIL);
      getState();
    });

    store.dispatch.should.have.been.calledWith(UPDATE_PROFIL);
  });
});

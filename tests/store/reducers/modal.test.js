import { expect } from 'chai';
import modalReducer, { initialState, MODAL } from '../../../src/store/reducers/modal';

describe('Modal reducer', () => {
  it('should return the initial state', () => {
    expect(modalReducer(undefined, {})).to.equal(initialState);
  });

  it('should handle MODAL', () => {
    expect(
      modalReducer(initialState, {
        type: MODAL,
        success: true,
        error: false,
      }),
    ).to.deep.equal({
      ...initialState,
      success: true,
      error: false,
    });
  });
});

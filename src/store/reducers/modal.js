export const initialState = {
  success: false,
  error: false,
};

export const MODAL = 'MODAL';

const modal = (state = initialState, action = {}) => {
  switch (action.type) {
    case MODAL:
      return {
        ...state,
        success: action.success,
        error: action.error,
      };
    default:
      return state;
  }
};

export const modalShow = (success, error) => ({
  type: MODAL,
  success,
  error,
});

export default modal;

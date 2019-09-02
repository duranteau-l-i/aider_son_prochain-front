const initialState = {
  beneficiary: {},
};

export const RECIEVE_BENEFICIARY = 'RECIEVE_BENEFICIARY';

const beneficiary = (state = initialState, action = {}) => {
  switch (action.type) {
    case RECIEVE_BENEFICIARY:
      return {
        ...state,
        beneficiary: action.data.beneficiary,
      };
    default:
      return state;
  }
};

export const recieveBeneficiary = data => ({
  type: RECIEVE_BENEFICIARY,
  data,
});

export default beneficiary;

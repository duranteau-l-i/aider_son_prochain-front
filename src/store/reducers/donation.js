const initialState = {
  donations: [],
};

export const RECIEVE_DONATIONS = 'RECIEVE_DONATIONS';

const donation = (state = initialState, action = {}) => {
  switch (action.type) {
    case RECIEVE_DONATIONS:
      return {
        ...state,
        donations: action.data,
      };
    default:
      return state;
  }
};

export const recieveDonations = donations => ({
  type: RECIEVE_DONATIONS,
  data: donations,
});

export default donation;

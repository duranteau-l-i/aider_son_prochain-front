const initialState = {};

export const FAKE = 'FAKE';

const donor = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const fake = data => ({
  type: FAKE,
  data,
});

export default donor;

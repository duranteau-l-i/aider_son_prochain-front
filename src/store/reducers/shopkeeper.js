export const initialState = {
  shopkeeper: {},
};

export const RECIEVE_SHOP = 'RECIEVE_SHOP';

const shopkeeper = (state = initialState, action = {}) => {
  switch (action.type) {
    case RECIEVE_SHOP:
      return {
        ...state,
        shopkeeper: action.data.shopkeeper,
      };
    default:
      return state;
  }
};

export const recieveShop = data => ({
  type: RECIEVE_SHOP,
  data,
});

export default shopkeeper;

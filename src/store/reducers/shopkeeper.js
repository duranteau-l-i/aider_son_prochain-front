const initialState = {
  shopkeepers: [],
  shopkeeper: {},
  donationConfirmMessage: {},
};

export const RECIEVE_SHOPS = 'RECIEVE_SHOPS';
export const RECIEVE_SHOP = 'RECIEVE_SHOP';
export const CONFIRM_DONATION = 'CONFIRM_DONATION';

const shopkeeper = (state = initialState, action = {}) => {
  switch (action.type) {
    case RECIEVE_SHOPS:
      return {
        ...state,
        shopkeepers: action.data.shopkeepers,
        location: action.location,
        maxDist: action.maxDist,
      };
    case RECIEVE_SHOP:
      return {
        ...state,
        shopkeeper: action.data.shopkeeper,
      };
    case CONFIRM_DONATION:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const recieveShops = (data, location, maxDist) => ({
  type: RECIEVE_SHOPS,
  data,
  location,
  maxDist,
});

export const recieveShop = data => ({
  type: RECIEVE_SHOP,
  data,
});

export const confirmDonation = () => ({
  type: CONFIRM_DONATION,
});

export default shopkeeper;

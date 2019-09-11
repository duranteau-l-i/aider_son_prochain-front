export const initialState = {
  products: [],
  shop: {},
};

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const RECIEVE_PRODUCTS = 'RECIEVE_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETED_PRODUCT = 'DELETED_PRODUCT';

const product = (state = initialState, action = {}) => {
  switch (action.type) {
    case RECIEVE_PRODUCTS:
      return {
        ...state,
        products: action.products,
        shop: { ...action.shop },
      };
    case DELETED_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product !== action.data),
      };
    default:
      return state;
  }
};

export const getProducts = id => ({
  type: GET_PRODUCTS,
  id,
});

export const recieveProducts = (products, shop) => ({
  type: RECIEVE_PRODUCTS,
  products,
  shop,
});

export const addProduct = (data, token) => ({
  type: ADD_PRODUCT,
  data,
  token,
});

export const deletedProduct = data => ({
  type: DELETED_PRODUCT,
  data,
});

export default product;

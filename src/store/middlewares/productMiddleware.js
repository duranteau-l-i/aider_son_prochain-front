import axios from 'axios';
import { ADD_PRODUCT, GET_PRODUCTS, recieveProducts } from 'store/reducers/product';
import { confirmProductAdded, confirmProductEdited } from 'store/reducers/product';

import { DELETE_PRODUCT, getProducts, EDIT_PRODUCT } from 'store/actionMiddleware';

import { decodedToken } from 'utils';

const productMiddleware = store => next => action => {
  switch (action.type) {
    case EDIT_PRODUCT:
      axios
        .patch(
          `${process.env.REACT_APP_API_URL_DEV}/product/update/${action.productId}`,
          action.data,
          {
            headers: {
              Authorization: `Bearer ${action.token}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          store.dispatch(confirmProductEdited());
          store.dispatch(recieveProducts(response.data.products, response.data.shopkeeper));
        })
        .catch(e => {
          console.log(e);
        });
      break;
    case GET_PRODUCTS:
      axios
        .get(`${process.env.REACT_APP_API_URL_DEV}/product/${action.shopkeeperId}`)
        .then(response => {
          store.dispatch(recieveProducts(response.data.products, response.data.shopkeeper));
        })
        .catch(e => {
          console.log(e);
        });
      break;
    case ADD_PRODUCT:
      axios
        .post(`${process.env.REACT_APP_API_URL_DEV}/product/`, action.data, {
          headers: {
            Authorization: `Bearer ${action.token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          store.dispatch(confirmProductAdded());
        })
        .catch(e => {
          console.log(e);
        });
      break;
    case DELETE_PRODUCT:
      axios
        .delete(`${process.env.REACT_APP_API_URL_DEV}/product/delete/${action.productId}`, {
          headers: {
            Authorization: `Bearer ${action.token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          const id = decodedToken(action.token).id;
          store.dispatch(getProducts(id));
        })
        .catch(e => {
          console.log('Impossible de supprimer le produit', e);
        });
      break;
    default:
      next(action);
  }
};

export default productMiddleware;

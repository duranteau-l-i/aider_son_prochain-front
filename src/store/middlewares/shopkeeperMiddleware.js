import axios from 'axios';
import { recieveShop } from 'store/reducers/shopkeeper';
import {  GET_SHOP } from 'store/actionMiddleware';

const shopkeeperMiddleware = store => next => action => {
  switch (action.type) {
    case GET_SHOP:
      axios
        .get(
          `${process.env.REACT_APP_API_URL_DEV}/${action.role}/shopkeepers/${action.shopkeeperId}`,
          {
            headers: {
              Authorization: `Bearer ${action.token}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          store.dispatch(recieveShop(response.data));
        })
        .catch(e => {
          console.log('Impossible de récupérer le shop', e);
        });
      break;
    default:
      next(action);
  }
};

export default shopkeeperMiddleware;

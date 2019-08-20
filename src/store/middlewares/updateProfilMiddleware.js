import axios from 'axios';
import { UPDATE_PROFIL } from 'store/actionMiddleware';
import { recieveCurrentUser } from 'store/reducers/user';
import { modalShow } from 'store/reducers/modal';

const shopkeeperMiddleware = store => next => action => {
  switch (action.type) {
    case UPDATE_PROFIL:
      axios
        .patch(`${process.env.REACT_APP_API_URL_DEV}/${action.role}/profil-update`, action.data, {
          headers: {
            Authorization: `Bearer ${action.token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          const data = { user: { ...response.data.user }, token: action.token };
          store.dispatch(recieveCurrentUser(data));
          store.dispatch(modalShow(true, false));
        })
        .catch(e => {
          console.log('Impossible de mettre à jour le profil', e);
          store.dispatch(modalShow(false, true));
        });
      break;

    default:
      next(action);
  }
};

export default shopkeeperMiddleware;

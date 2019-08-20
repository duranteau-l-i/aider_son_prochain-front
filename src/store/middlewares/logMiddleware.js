import { SUBMIT_LOGIN, SUBMIT_REGISTER, DECONNEXION } from 'store/actionMiddleware';
import { recieveCurrentUser, confirmRegister, confirmLogin } from 'store/reducers/user';
import { modalShow } from 'store/reducers/modal';
import { alert } from 'store/reducers/utils';
//import { decodedToken } from 'utils';

import axios from 'axios';

const logMiddleware = store => next => action => {
  switch (action.type) {
    case SUBMIT_REGISTER:
      axios
        .post(`${process.env.REACT_APP_API_URL_DEV}/${action.role}/register`, action.data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          store.dispatch(confirmRegister());
          store.dispatch(modalShow(true, false));
        })
        .catch(e => {
          store.dispatch(modalShow(false, true));
        });
      break;
    case SUBMIT_LOGIN:
      axios
        .post(`${process.env.REACT_APP_API_URL_DEV}/connexion`, action.data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          store.dispatch(recieveCurrentUser(response.data));
        })
        .catch(e => {
          console.log(e.message);
          store.dispatch(modalShow(false, true));
        });

      break;
    case DECONNEXION:
      axios
        .post(
          `${process.env.REACT_APP_API_URL_DEV}/${action.role}/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${action.token}` },
          },
        )
        .then(response => {
          store.dispatch(recieveCurrentUser({}));
        })
        .catch(e => {
          console.log(e.message);
        });
      store.dispatch(recieveCurrentUser({}));
      break;
    default:
      next(action);
  }
};

export default logMiddleware;

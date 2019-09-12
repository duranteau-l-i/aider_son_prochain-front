import axios from 'axios';
import { recieveDonations } from 'store/reducers/donation';
import { modalShow } from 'store/reducers/modal';
import { SEND_DONATION, GET_DONATIONS, VALIDATE_DONATION } from 'store/actionMiddleware';

const shopkeeperMiddleware = store => next => action => {
  switch (action.type) {
    case GET_DONATIONS:
      axios
        .get(`${process.env.REACT_APP_API_URL}/${action.role}/donations/`, {
          headers: {
            Authorization: `Bearer ${action.token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          store.dispatch(recieveDonations(response.data.donations));
        })
        .catch(e => {
          console.log('Impossible de récupérer les donations', e);
        });
      break;
    case SEND_DONATION:
      axios
        .post(`${process.env.REACT_APP_API_URL}/${action.role}/donation/`, action.data, {
          headers: {
            Authorization: `Bearer ${action.token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          store.dispatch(modalShow(true, false));
        })
        .catch(e => {
          console.log("Impossible d'envoyer la donation", e);
          store.dispatch(modalShow(false, true));
        });
      break;
    case VALIDATE_DONATION:
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/${action.role}/donation-used/${action.donationId}`,
          action.data,
          {
            headers: {
              Authorization: `Bearer ${action.token}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          console.log('Donation validé', response.data);
        })
        .catch(e => {
          console.log("Impossible d'envoyer la donation", e);
        });
      break;
    default:
      next(action);
  }
};

export default shopkeeperMiddleware;

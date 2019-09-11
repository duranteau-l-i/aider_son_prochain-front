import axios from 'axios';
import { recieveBeneficiary } from 'store/reducers/beneficiary';
import { GET_BENEFICIARY } from 'store/actionMiddleware';

const beneficiaryMiddleware = store => next => action => {
  switch (action.type) {
    case GET_BENEFICIARY:
      axios
        .get(
          `${process.env.REACT_APP_API_URL_DEV}/${action.role}/beneficiaries/${action.beneficiaryId}`,
          {
            headers: {
              Authorization: `Bearer ${action.token}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          store.dispatch(recieveBeneficiary(response.data));
        })
        .catch(e => {
          console.log('Impossible de récupérer le bénéficiaire', e.message);
        });
      break;
    default:
      next(action);
  }
};

export default beneficiaryMiddleware;

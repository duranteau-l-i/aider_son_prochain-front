import { combineReducers } from 'redux';

import beneficiary from './beneficiary';
import donor from './donor';
import shopkeeper from './shopkeeper';
import product from './product';
import donation from './donation';
import user from './user';
import modal from './modal';

const reducers = combineReducers({
  beneficiary,
  donor,
  shopkeeper,
  product,
  donation,
  user,
  modal,
});

export default reducers;

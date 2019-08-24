import { connect } from 'react-redux';

import ShopkeeperDonation from 'components/Shopkeeper/ShopkeeperDonation';
import { getShop, getProducts, sendDonation } from 'store/actionMiddleware';
import { decodedToken } from 'utils';

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    role: decodedToken(state.user.currentUser.token).role,
    token: state.user.currentUser.token,
    shop: state.shopkeeper.shopkeeper,
    products: state.product.products,
  };
};

const mapDispatchToProps = dispatch => ({
  getShop: (role, token, shopkeeperId) => {
    dispatch(getShop(role, token, shopkeeperId));
  },
  getProducts: shopkeeperId => {
    dispatch(getProducts(shopkeeperId));
  },
  sendDonation: (role, token, data) => {
    dispatch(sendDonation(role, token, data));
  },
});

const ShopkeeperDonationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeeperDonation);

export default ShopkeeperDonationContainer;

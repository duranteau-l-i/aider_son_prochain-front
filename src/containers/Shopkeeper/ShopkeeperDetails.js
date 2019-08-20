import { connect } from 'react-redux';

import ShopkeeperDetails from 'components/Shopkeeper/ShopkeeperDetails';
import { getShop, getProducts, searchBeneficiary, sendDonation } from 'store/actionMiddleware';
import { decodedToken } from 'utils';

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    role: decodedToken(state.user.currentUser.token).role,
    token: state.user.currentUser.token,
    shop: state.shopkeeper.shopkeeper,
    products: state.product.products,
    beneficiariesSuggests: state.beneficiary.beneficiaries,
    donationConfirmMessage: state.shopkeeper.donationConfirmMessage,
  };
};

const mapDispatchToProps = dispatch => ({
  getShop: (role, token, shopkeeperId) => {
    dispatch(getShop(role, token, shopkeeperId));
  },
  getProducts: shopkeeperId => {
    dispatch(getProducts(shopkeeperId));
  },
  searchBeneficiary: (textValue, token) => {
    dispatch(searchBeneficiary(textValue, token));
  },
  sendDonation: (data, token) => {
    dispatch(sendDonation(data, token));
  },
});

const ShopkeeperDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeeperDetails);

export default ShopkeeperDetailsContainer;

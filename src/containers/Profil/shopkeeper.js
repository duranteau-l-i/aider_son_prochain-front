import { connect } from 'react-redux';

import Shopkeeper from 'components/Profil/Shopkeeper';
import { getShop, getProducts, deleteProduct } from 'store/actionMiddleware';
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
  deleteProduct: (token, productId) => {
    dispatch(deleteProduct(token, productId));
  },
});

const ProfilShopkeeperContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shopkeeper);

export default ProfilShopkeeperContainer;

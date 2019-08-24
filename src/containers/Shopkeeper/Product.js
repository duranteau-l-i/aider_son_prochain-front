import { connect } from 'react-redux';

import Product from 'components/Shopkeeper/Product';
import { getProducts, deleteProduct } from 'store/actionMiddleware';
import { decodedToken } from 'utils';

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    role: decodedToken(state.user.currentUser.token).role,
    token: state.user.currentUser.token,
    products: state.product.products,
  };
};

const mapDispatchToProps = dispatch => ({
  getProducts: shopkeeperId => {
    dispatch(getProducts(shopkeeperId));
  },
  deleteProduct: (token, productId) => {
    dispatch(deleteProduct(token, productId));
  },
});

const ProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product);

export default ProductContainer;

import { connect } from 'react-redux';

import EditProduct from 'components/Shopkeeper/EditProduct';

import { editProduct } from 'store/actionMiddleware';

import { decodedToken } from 'utils';

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  role: decodedToken(state.user.currentUser.token).role,
  token: state.user.currentUser.token,
  productEditedConfirmMessage: state.product.productEditedConfirmMessage,
});

const mapDispatchToProps = dispatch => ({
  submitEditProductForm: (data, productId, token) => {
    dispatch(editProduct(data, productId, token));
  },
});

const EditProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProduct);

export default EditProductContainer;

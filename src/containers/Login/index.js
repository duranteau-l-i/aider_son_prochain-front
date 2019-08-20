import { connect } from 'react-redux';

import Login from 'components/Login';

import { submitLogin } from 'store/actionMiddleware';

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  submitLogin: data => {
    dispatch(submitLogin(data));
  },
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginContainer;

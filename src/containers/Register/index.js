import { connect } from 'react-redux';

import Register from 'components/Register';

import { submitRegister } from 'store/actionMiddleware';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  submitRegister: (data, role) => {
    dispatch(submitRegister(data, role));
  },
});

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export default RegisterContainer;

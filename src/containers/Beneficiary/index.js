import { connect } from 'react-redux';

import Beneficiary from 'components/Beneficiary';
import { decodedToken } from 'utils';

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    role: decodedToken(state.user.currentUser.token).role,
    token: state.user.currentUser.token,
  };
};

const mapDispatchToProps = dispatch => ({});

const BeneficiaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Beneficiary);

export default BeneficiaryContainer;

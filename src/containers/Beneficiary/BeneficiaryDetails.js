import { connect } from 'react-redux';
import { getBeneficiary } from 'store/actionMiddleware';
import { decodedToken } from 'utils';

import BeneficiaryDetails from 'components/Beneficiary/BeneficiaryDetails';

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  role: decodedToken(state.user.currentUser.token).role,
  token: state.user.currentUser.token,
  beneficiary: state.beneficiary.beneficiary,
});

const mapDispatchToProps = dispatch => ({
  getBeneficiary: (role, token, beneficiaryId) => {
    dispatch(getBeneficiary(role, token, beneficiaryId));
  },
});

const BeneficiaryDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BeneficiaryDetails);

export default BeneficiaryDetailsContainer;

import { connect } from 'react-redux';

import ProfilUpdate from 'components/ProfilUpdate';

import { decodedToken } from 'utils';
import { updateProfile, showHideModal, initProfileUpdate } from 'store/actionMiddleware';

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  role: decodedToken(state.user.currentUser.token).role,
  token: state.user.currentUser.token,
  profileUpdated: state.user.profileUpdated,
  show: state.modal.show,
});

const mapDispatchToProps = dispatch => ({
  initProfileUpdate: () => {
    dispatch(initProfileUpdate());
  },
  updateProfile: (data, role, token) => {
    dispatch(updateProfile(data, role, token));
  },
  showHideModal: bool => {
    dispatch(showHideModal(bool));
  },
});

const ProfilUpdateContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilUpdate);

export default ProfilUpdateContainer;

import { connect } from 'react-redux';

import Profil from 'components/Profil';

import { modalShow } from 'store/reducers/modal';

import { decodedToken } from 'utils';

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  role: decodedToken(state.user.currentUser.token).role,
});

const mapDispatchToProps = dispatch => ({
  modalShow: (success, error) => {
    dispatch(modalShow(success, error));
  },
});

const ProfilContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profil);

export default ProfilContainer;

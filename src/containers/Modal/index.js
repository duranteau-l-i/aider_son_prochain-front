import { connect } from 'react-redux';

import Modal from 'components/Modal';

import { modalShow } from 'store/reducers/modal';

const mapStateToProps = state => ({
  success: state.modal.success,
  error: state.modal.error,
});

const mapDispatchToProps = dispatch => ({
  modalShow: (success, error) => {
    dispatch(modalShow(success, error));
  },
});

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);

export default ModalContainer;

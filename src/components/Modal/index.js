import React from 'react';
import { Link } from 'react-router-dom';

import './modal.scss';

const Modal = ({ success, error, modalShow, title, message, messageError, page }) => {
  // useEffect(() => {
  //   return function cleanup() {
  //     modalShow(false, false);
  //   };
  // });

  const onHide = () => {
    modalShow(false, false);
  };

  if (success) {
    return (
      <div
        className="modal fade show"
        id="myModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {title}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={onHide}>
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onHide}
              >
                Fermer
              </button>
              <Link to={`/${page}`} exact path={`/${page}`}>
                <button type="button" className="btn btn-primary">
                  Aller à la page {page}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div
        className="modal fade show"
        id="myModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {title}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={onHide}>
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body alert-danger">{messageError}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onHide}
              >
                Fermer
              </button>
              {/* <Link to={`/${page}`} exact path={`/${page}`}>
                <button type="button" className="btn btn-danger">
                  Retour {page}
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return '';
  }
};

export default Modal;

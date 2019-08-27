import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from 'components/Header';

import Beneficiary from 'components/Profil/Beneficiary';
import ProfilHeader from 'components/Profil/ProfilHeader';
import Error403 from 'components/Error403';

import './beneficiary.scss';
import '../Profil/profil.scss';

import beneficiaryBackgroundImage from 'assets/img/background-beneficiary.jpg';

class BeneficiaryDetails extends Component {
  componentDidMount() {
    const { token, role, getBeneficiary } = this.props;
    const beneficiaryId = this.props.match.params.id;
    getBeneficiary(role, token, beneficiaryId);
  }

  render() {
    const { beneficiary, role } = this.props;
    document.title = `${beneficiary.username} - Aide ton prochain`;
    const currentUser = {
      user: beneficiary,
    };
    if (currentUser.User !== undefined) {
      return (
        <>
          <Header
            title={beneficiary.username}
            backgroundImage={beneficiaryBackgroundImage}
            theme="dark"
          />

          <div className="container mt-5 edit-profile-container profile-view-container">
            <div className="row">
              <div className="col col-md-10 col-lg-8 mx-auto bg-white py-medium">
                <div className="row">
                  <div className="col px-md-large">
                    <ProfilHeader
                      title={`${currentUser.user.username} (${role})`}
                      user={currentUser}
                      // eslint-disable-next-line jsx-a11y/aria-role
                      role="beneficiary"
                      publicProfile={true}
                    />
                    <Beneficiary currentUser={currentUser} role={role} publicProfile={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <Error403 message="Vous ne pouvez pas accéder à cette page, vous n'êtes pas connectés" />
      );
    }
  }
}

BeneficiaryDetails.propTypes = {
  currentUser: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  beneficiary: PropTypes.object.isRequired,
  getBeneficiary: PropTypes.func.isRequired,
};

export default withRouter(BeneficiaryDetails);

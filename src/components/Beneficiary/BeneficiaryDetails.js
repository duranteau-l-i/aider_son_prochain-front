import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Header from 'components/Header';

import BeneficiaryDetails from 'components/Profil/Beneficiary';
import ProfilHeader from 'components/Profil/ProfilHeader';

import './beneficiary.scss';
import '../Profil/profil.scss';

import beneficiaryBackgroundImage from 'assets/img/background-beneficiary.jpg';

class ShopkeeperDetails extends Component {
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
                    role={role}
                    publicProfile={true}
                  />
                  <BeneficiaryDetails currentUser={currentUser} role={role} publicProfile={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ShopkeeperDetails);

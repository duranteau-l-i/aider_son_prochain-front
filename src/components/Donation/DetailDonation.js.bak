import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import backgroundDonations from 'assets/img/donations.jpg';
import './donations.scss';

const DetailDonation = ({ role }) => {
  let title = '';
  role = 'shopkeeper';
  switch (role) {
    case 'beneficiary':
      title = "Détails d'une donation envoyée";
      break;
    case 'donor':
      title = "Détails d'une donation reçue";
      break;
    case 'shopkeeper':
      title = "Détails d'une transaction";
      break;
    default:
      title = 'Liste des dons';
  }
  return (
    <>
      <Header title={title} backgroundImage={backgroundDonations} />
      <div className="container mt-4 py-5">
        <div className="row justify-content-center">
          <div className="col col-lg-8">
            <p>{role} :</p>
          </div>
        </div>
      </div>
    </>
  );
};

DetailDonation.propTypes = {
  role: PropTypes.func.isRequired,
};

export default DetailDonation;

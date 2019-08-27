import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import EmptyState from 'components/EmptyState';
import './donations.scss';
import backgroundDonations from 'assets/img/donations.jpg';
import Error403 from 'components/Error403';
import DonationBody from './DonationBody';

class Donations extends React.Component {
  componentDidMount() {
    const { role, token, getDonations } = this.props;
    getDonations(role, token);
    role !== 'shopkeeper'
      ? (document.title = `Mes donations - Aider son prochain`)
      : (document.title = `Suivi des transactions - Aider son prochain`);
  }

  handleValidateTransaction = evt => {
    evt.preventDefault();
    const confirmValidateDonation = window.confirm(
      'Voulez-vous vraiement valider cette transaction ?',
    );
    if (confirmValidateDonation) {
      const { validateDonation, getDonations, role, token } = this.props;
      const donationId = evt.target.id;
      validateDonation(role, token, donationId);
      getDonations(role, token);
    }
  };

  render() {
    const { role, donations, currentUser } = this.props;
    let title = '';
    switch (role) {
      case 'beneficiary':
        title = 'Liste des dons reçus';
        break;
      case 'donor':
        title = 'Liste des dons envoyés';
        break;
      case 'shopkeeper':
        title = 'Liste des transactions';
        break;
      default:
        title = 'Liste des dons';
    }

    const compare = (a, b) => {
      return new Date(b.used_at).getTime() - new Date(a.used_at).getTime();
    };

    const used = donations.filter(donation => donation.used_at !== undefined).sort(compare);

    const notUsed = donations.filter(donation => donation.used_at === undefined).reverse();

    if (currentUser.user !== undefined) {
      return (
        <>
          <Header title={title} theme="dark" backgroundImage={backgroundDonations} />
          <div className="container mt-4 py-5">
            <div className="row justify-content-center">
              <div className="col col-md-8">
                {used.length <= 0 && notUsed.length <= 0 && (
                  <>
                    {role === 'donor' && (
                      <EmptyState
                        message="Oops, vous n'avez pas fait de donation, Vous pouvez en faire une en visitant les commerces à proximité"
                        link={{ url: '/shopkeeper', label: 'Voir les commerces' }}
                      />
                    )}

                    {role === 'shopkeeper' && (
                      <EmptyState
                        message="Oops, il n'y a pas de transaction en cours dans votre établissement"
                        link={{ url: '/profil', label: 'Retour au profil' }}
                      />
                    )}
                    {role === 'beneficiary' && (
                      <EmptyState
                        message="Oops, vous n'avez pas encore reçu de don."
                        link={{ url: '/profil', label: 'Retour au profil' }}
                      />
                    )}
                  </>
                )}
                {notUsed.length > 0 &&
                  notUsed.map(donation => (
                    <DonationBody used={false} donation={donation} role={role} />
                  ))}
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col col-md-8">
                {used.length > 0 &&
                  used.map(donation => (
                    <DonationBody used={true} donation={donation} role={role} />
                  ))}
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

Donations.propTypes = {
  currentUser: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  donations: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  getDonations: PropTypes.func.isRequired,
  validateDonation: PropTypes.func.isRequired,
};

export default Donations;

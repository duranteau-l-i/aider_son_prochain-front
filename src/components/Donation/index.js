import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import EmptyState from 'components/EmptyState';
import './donations.scss';
import backgroundDonations from 'assets/img/donations.jpg';
import { getDonationData } from 'utils/donationUtils';
import Error403 from 'components/Error403';

class Donations extends React.Component {
  componentDidMount() {
    const { role, token, getDonations } = this.props;
    getDonations(role, token);
    role !== 'shopkeeper'
      ? (document.title = `Mes donations - Aide ton prochain`)
      : (document.title = `Suivi des transactions - Aide ton prochain`);
  }

  handleValidateTransaction = evt => {
    evt.preventDefault();
    const confirmValidateDonation = window.confirm(
      'Voulez-vous vraiement valider cette transaction ?',
    );
    if (confirmValidateDonation) {
      const { validateDonation, getDonations, role, token } = this.props;
      const donationId = evt.target.dataset.id;
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

    const pimpedDonations = donations.map(donation => {
      return {
        ...donation,
        additionalData: getDonationData(donation),
      };
    });

    const used = pimpedDonations.filter(donation => donation.additionalData.used === true);

    const notUsed = pimpedDonations.filter(donation => donation.additionalData.used === false);

    if (currentUser.user !== undefined) {
      return (
        <>
          <Header title={title} theme="dark" backgroundImage={backgroundDonations} />
          <div className="container mt-4 py-5">
            <div className="row justify-content-center">
              <div className="col col-md-6">
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
                  notUsed.map(donation => {
                    return (
                      <div className="card mb-4 donation" key={donation._id}>
                        <div
                          data-toggle="collapse"
                          data-target={`#collapseDonation-${donation._id}`}
                          aria-expanded="false"
                          aria-controls="collapseExample"
                          className="card-header d-flex justify-content-between align-items-baseline"
                        >
                          <div>
                            {role === 'donor' || role === 'beneficiary'
                              ? 'Donation '
                              : 'Transaction '}
                            {donation.additionalData.donationDisplayRef}
                            <div className="text-small text-muted">
                              Date : {donation.additionalData.donationDate}
                            </div>
                          </div>
                          <span className="text-success">Disponible</span>
                        </div>
                        <div
                          className="card-body text-center collapse"
                          id={`collapseDonation-${donation._id}`}
                        >
                          <div className="d-md-flex align-items-baseline">
                            <div className="donation-metas">
                              <div className="my-3 text-center text-muted">
                                {role === 'donor' && (
                                  <>
                                    <span>Votre donation pour</span>
                                    <h5 className="text-dark">{donation.beneficiary.username}</h5>
                                  </>
                                )}
                                {role === 'beneficiary' && (
                                  <>
                                    De la part de{' '}
                                    <h5 className="text-dark">{donation.donor.username}</h5>
                                  </>
                                )}
                                {role === 'shopkeeper' && (
                                  <>
                                    De {donation.donor.username} à {donation.beneficiary.username}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <table className="recap my-3 text-left">
                            <tbody>
                              {donation.products.map(product => {
                                return (
                                  <tr key={product._id}>
                                    <td
                                      className={
                                        role === 'beneficiary'
                                          ? 'product-item text-center'
                                          : 'product-item'
                                      }
                                    >
                                      1 {product.name}
                                    </td>
                                    <td className="text-right">
                                      {role !== 'beneficiary' && <span>{product.price}€</span>}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                            {role !== 'beneficiary' && (
                              <tfoot>
                                <tr>
                                  <td>
                                    <b>Total</b>
                                  </td>
                                  <td className="text-right">
                                    {donation.additionalData.sumOfProducts}€
                                  </td>
                                </tr>
                              </tfoot>
                            )}
                          </table>
                          <div>
                            <span className="text-muted text-small">
                              {role === 'beneficiary' || role === 'donor' ? (
                                <>
                                  Disponible chez <br />
                                  <a href="##"> {donation.shopkeeper.shopkeeper_name}</a>
                                </>
                              ) : role === 'shopkeeper' ? (
                                <button
                                  data-id={donation._id}
                                  onClick={this.handleValidateTransaction}
                                  className="btn btn-primary mb-3 text-white"
                                >
                                  Valider la transaction
                                </button>
                              ) : null}
                            </span>
                          </div>
                          {donation.additionalData.used === false && role === 'beneficiary' && (
                            <div className="mt-4">
                              <span className="text-muted">Référence à rappeler :</span>
                              <h4>{donation.additionalData.donationDisplayRef}</h4>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col col-md-6 ">
                {used.length > 0
                  ? used.map(donation => {
                      return (
                        <div className="card mb-4 donation" key={donation._id}>
                          <div
                            data-toggle="collapse"
                            data-target={`#collapseDonation-${donation._id}`}
                            aria-expanded="false"
                            aria-controls="collapseExample"
                            className="card-header d-flex justify-content-between align-items-baseline"
                          >
                            <div>
                              {role === 'donor' || role === 'beneficiary'
                                ? 'Donation '
                                : 'Transaction '}
                              {donation.additionalData.donationDisplayRef}
                              <div className="text-small text-muted">
                                Date : {donation.additionalData.donationDate}
                              </div>
                            </div>

                            <span className="text-info">Consommée</span>
                          </div>
                          <div
                            className="card-body text-center collapse"
                            id={`collapseDonation-${donation._id}`}
                          >
                            <div className="d-md-flex align-items-baseline">
                              <div className="donation-metas">
                                <div className="my-3 text-center text-muted">
                                  {role === 'donor' && (
                                    <>
                                      <span>Votre donation pour</span>
                                      <h5 className="text-dark">{donation.beneficiaryUsername}</h5>
                                    </>
                                  )}
                                  {role === 'beneficiary' && (
                                    <>
                                      De la part de{' '}
                                      <h5 className="text-dark">{donation.donor.username}</h5>
                                    </>
                                  )}
                                  {role === 'shopkeeper' && (
                                    <>
                                      De {donation.donor.username} à {donation.beneficiary.username}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <table className="recap my-3 text-left">
                              <tbody>
                                {donation.products.map(product => {
                                  return (
                                    <tr key={product._id}>
                                      <td
                                        className={
                                          role === 'beneficiary'
                                            ? 'product-item text-center'
                                            : 'product-item'
                                        }
                                      >
                                        1 {product.name}
                                      </td>
                                      <td className="text-right">
                                        {role !== 'beneficiary' && <span>{product.price}€</span>}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                              {role !== 'beneficiary' && (
                                <tfoot>
                                  <tr>
                                    <td>
                                      <b>Total</b>
                                    </td>
                                    <td className="text-right">
                                      {donation.additionalData.sumOfProducts}€
                                    </td>
                                  </tr>
                                </tfoot>
                              )}
                            </table>
                            <div>
                              <span className="text-muted text-small">
                                {donation.additionalData.used === true &&
                                  (role === 'beneficiary' || role === 'donor' ? (
                                    <>
                                      Consommée le 17/07/2019
                                      <br /> chez
                                      <a href="##"> {donation.shopkeeper.shopkeeper_name}</a>
                                    </>
                                  ) : role === 'shopkeeper' ? (
                                    <>Consommée le 17/08/2019</>
                                  ) : null)}
                              </span>
                            </div>
                            {donation.additionalData.used === false && role === 'beneficiary' && (
                              <div className="mt-4">
                                <span className="text-muted">Référence à rappeler :</span>
                                <h4>{donation.additionalData.donationDisplayRef}</h4>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  : null}
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
};

export default Donations;

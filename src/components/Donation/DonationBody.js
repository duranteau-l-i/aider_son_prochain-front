import React from 'react';
import { Link } from 'react-router-dom';

import { getDonationData } from 'utils/donationUtils';

const DonationBody = ({ donation, role, used }) => {
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
          {role === 'donor' || role === 'beneficiary' ? 'Donation ' : 'Transaction '}
          {getDonationData(donation).donationDisplayRef}
          <div className="text-small text-muted">
            Date: {getDonationData(donation).donationDate}
          </div>
        </div>
        {!used && <span className="text-success">Disponible</span>}
        {used && <span className="text-info">Consommée</span>}
      </div>
      <div className="card-body text-center collapse" id={`collapseDonation-${donation._id}`}>
        <div className="d-md-flex align-items-baseline">
          <div className="donation-metas">
            <div className="my-3 text-center text-muted">
              {role === 'donor' && (
                <>
                  <p>
                    Votre donation pour{' '}
                    <span className="text-dark font-weight-bold text-capitalize">
                      {donation.beneficiaryUsername}
                    </span>
                  </p>
                </>
              )}
              {role === 'beneficiary' && (
                <>
                  <p className="">
                    De la part de{' '}
                    <span className="text-dark font-weight-bold text-capitalize">
                      {donation.donor.username}
                    </span>
                  </p>
                </>
              )}
              {role === 'shopkeeper' && (
                <>
                  De{' '}
                  <span className="text-dark font-weight-bold text-capitalize">
                    {donation.donor.username}
                  </span>{' '}
                  à{' '}
                  <span className="text-dark font-weight-bold text-capitalize">
                    {donation.beneficiary.username}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <table className="recap mb-3 text-left">
          <tbody>
            {donation.products.map(product => {
              return (
                <tr key={product._id}>
                  <td
                    className={role === 'beneficiary' ? 'product-item text-center' : 'product-item'}
                  >
                    1 {product.name}
                  </td>
                  <td className="text-right">
                    {role !== 'beneficiary' && <span>{product.price} €</span>}
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
                <td className="text-right">{getDonationData(donation).sumOfProducts} €</td>
              </tr>
            </tfoot>
          )}
        </table>

        {!used && (
          <div>
            <span className="text-muted text-small">
              {(role === 'beneficiary' || role === 'donor') && (
                <>
                  Disponible chez <br />
                  <Link to={`/shopkeeper/${donation.shopkeeper._id}`}>
                    <span className="text-capitalize">{donation.shopkeeper.shopkeeper_name}</span>
                  </Link>
                </>
              )}
              {role === 'shopkeeper' && (
                <button
                  id={donation._id}
                  onClick={this.handleValidateTransaction}
                  className="btn btn-primary mb-3 text-white"
                >
                  Valider la transaction
                </button>
              )}
            </span>
          </div>
        )}
        {used && (
          <div>
            <span className="text-muted text-small">
              {(role === 'beneficiary' || role === 'donor') && (
                <>
                  Consommée le {getDonationData(donation).donationUsed}
                  <br /> chez{' '}
                  <Link to={`/shopkeeper/${donation.shopkeeper._id}`}>
                    <span className="text-capitalize">{donation.shopkeeper.shopkeeper_name}</span>
                  </Link>
                </>
              )}
              {role === 'shopkeeper' && <>Consommée le 17/08/2019</>}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationBody;

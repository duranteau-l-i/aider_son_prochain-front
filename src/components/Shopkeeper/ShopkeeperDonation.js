import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from 'components/Header';
import EmptyState from 'components/EmptyState';
import Suggest from 'components/Suggest';
import Modal from 'containers/Modal';

import OpeningHours from './OpeningHours';
import './shopkeeper.scss';
import shopKeeperBackgroundImage from 'assets/img/background-shopkeepers.jpg';

class ShopkeeperDonation extends Component {
  state = {
    total: 0,
    beneficiary: '',
    donation: {
      shopkeeper: this.props.match.params.id,
      beneficiary: '',
      donor: this.props.currentUser.user._id,
      products: [],
    },
    donationIsReady: false,
    beneficiariesByName: [],
    suggest: { id: '', name: '' },
    suggestSubmit: false,
  };

  componentDidMount() {
    const { token, role, getShop, getProducts } = this.props;
    const shopkeeperId = this.props.match.params.id;
    getShop(role, token, shopkeeperId);
    getProducts(shopkeeperId);
  }

  // suggest component
  handleBeneficiarySelect = select => {
    this.setState({
      suggest: { id: select._id, name: select.username },
      beneficiary: '',
    });
  };

  searchBeneficiaryClear = value => {
    console.log(value);
    if (value !== '') {
      if (this.state.suggest.name !== '' && this.state.suggest.name !== value) {
        this.setState(state => ({
          suggest: { id: '', name: '' },
          beneficiary: value,
        }));
      }
      this.setState(state => ({
        beneficiary: value,
      }));
    } else {
      this.setState(state => ({
        beneficiary: '',
      }));
    }
  };

  suggestSubmit = e => {
    e.preventDefault();
  };

  // form
  handleChange = e => {
    const { checked, value, id } = e.target;
    if (checked) {
      this.setState(state => ({
        total: state.total + Number(value),
        donation: { ...state.donation, products: [...state.donation.products, id] },
      }));
    } else {
      let newProducts = this.state.donation.products.filter(el => el !== id);
      this.setState(state => ({
        total: state.total - Number(value),
        donation: { ...state.donation, products: newProducts },
      }));
    }
  };

  openingHours = hour => {
    let h = '';

    if (hour === 0) {
      return h;
    }

    hour = (hour < 10 ? '0' + hour : hour).toString();
    if (hour.includes('.')) {
      h = hour.replace('.', 'h');
      if (h.length === 4) {
        h = h + '0';
      }
    } else {
      h = hour + 'h00';
    }
    return h;
  };

  handleSubmit = e => {
    e.preventDefault();

    let beneficiary = '';

    if (this.state.suggest.id !== '') {
      beneficiary = this.state.suggest.id;
    } else {
      beneficiary = this.state.beneficiary;
    }

    const data = {
      beneficiary: beneficiary,
      beneficiaryUsername: this.state.beneficiary,
      shopkeeper: this.state.donation.shopkeeper,
      donor: this.state.donation.donor,
      products: this.state.donation.products,
    };

    if (
      beneficiary !== '' &&
      this.state.donation.shopkeeper !== '' &&
      this.state.donation.donor !== '' &&
      this.state.donation.products.length > 0
    ) {
      const { role, token, sendDonation } = this.props;
      sendDonation(role, token, data);
    }
  };

  render() {
    const { shop, products, role } = this.props;
    document.title = `${shop.shopkeeper_name} - Aide ton prochain`;
    return (
      <>
        <Header
          title={shop.shopkeeper_name}
          backgroundImage={shopKeeperBackgroundImage}
          theme="dark"
        />

        <div className="container mt-4 py-5">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-8">
              {products && shop && (
                <>
                  <div className="mb-2 table-header d-flex justify-content-between align-items-center">
                    <p className="font-weight-bold">
                      {role === 'donor' && products.length > 0 && (
                        <>1 - Sélectionnez les produits que vous désirez offrir</>
                      )}
                    </p>
                  </div>
                  {products.length > 0 && (
                    <>
                      <form
                        className="mt-2 mb-4 form-inline"
                        onSubmit={this.handleSubmit}
                        onChange={this.handleChange}
                        autoComplete="off"
                      >
                        <table className="table text-left">
                          <thead>
                            <tr className="text-muted">
                              <th scope="col">Produit</th>

                              {role !== 'beneficiary' && (
                                <>
                                  <th scope="col">Prix</th>
                                  <th scope="col">Sélection</th>
                                </>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {products.map(product => (
                              <tr className="product-row" key={product._id}>
                                <td>
                                  {product.name}
                                  {product.description && (
                                    <small className="d-block text-muted">
                                      {product.description}
                                    </small>
                                  )}
                                </td>
                                {role !== 'beneficiary' && (
                                  <>
                                    <td>{product.price} €</td>
                                    <td className="selector text-center">
                                      {(role === 'donor' || role === 'shopkeeper') && (
                                        <input
                                          type="checkbox"
                                          value={product.price}
                                          id={product._id}
                                        />
                                      )}
                                    </td>
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                          {(role === 'donor' || role === 'shopkeeper') && (
                            <tfoot>
                              <tr>
                                <th scope="row">Total</th>
                                <td>{this.state.total} €</td>
                                <td />
                              </tr>
                            </tfoot>
                          )}
                        </table>
                      </form>
                      {(role === 'donor' || role === 'shopkeeper') && (
                        <>
                          <p className="font-weight-bold">
                            2 - Affectez votre don à un bénéficiaire
                          </p>
                          <div className="d-flex align-items-center" style={{ width: '100%' }}>
                            <div className="d-flex flex-column">
                              <div className="form-group">
                                <small>Recherchez un beneficiaire ou entrez un nom libre.</small>
                                <form onSubmit={this.suggestSubmit}>
                                  <div className="d-flex">
                                    <div className="form-group d-flex">
                                      <Suggest
                                        role={this.props.role}
                                        token={this.props.token}
                                        handleBeneficiarySelect={this.handleBeneficiarySelect}
                                        searchBeneficiaryBlur={this.searchBeneficiaryBlur}
                                        searchBeneficiaryClear={this.searchBeneficiaryClear}
                                        list={true}
                                      />
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>

                            {this.state.beneficiary !== '' &&
                            this.state.donation.products.length > 0 ? (
                              <input
                                type="submit"
                                className="btn btn-custom-accent ml-auto btn-lg"
                                name="submitProductSelector"
                                value="Valider la donation"
                                onClick={this.handleSubmit}
                              />
                            ) : (
                              <input
                                type="submit"
                                className="btn btn-custom-accent ml-auto btn-lg"
                                name="submitProductSelector"
                                value="Valider la donation"
                                disabled
                              />
                            )}
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {(!products || products.length === 0) && (
                    <EmptyState
                      message="Cet établissement n'a aucun produit disponible pour le moment"
                      link={{ label: 'Retour à la liste', url: '/shopkeeper' }}
                      className="mb-5"
                    />
                  )}
                </>
              )}
            </div>
            <div className="col-md-12 col-lg-4">
              {shop.localisation && (
                <div className="card">
                  <div className="card-body">
                    <p className="text-small">
                      <span className="font-weight-bold">Adresse : </span>
                      <br />
                      <span>{shop.location.address}</span>
                      <br />
                      <a
                        href={`https://maps.google.com/?q=${shop.location.latitude},${
                          shop.location.longitude
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Voir sur la carte
                      </a>
                    </p>

                    <span className="font-weight-bold text-small d-block mb-2">Horaires : </span>

                    <OpeningHours shop={shop} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Modal
          title="Donation"
          message="Le donation a été effectuée avec succès"
          messageError="Donation non validée"
          page="donations"
        />
      </>
    );
  }
}

export default withRouter(ShopkeeperDonation);

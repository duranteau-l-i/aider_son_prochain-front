import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import Header from 'components/Header';
import OpeningHours from './OpeningHours';
import './shopkeeper.scss';
import shopKeeperBackgroundImage from 'assets/img/background-shopkeepers.jpg';
import EmptyState from 'components/EmptyState';

class ShopkeeperDetails extends Component {
  state = {
    selectedProductsTotal: 0,
    donation: {
      shopkeeper: this.props.match.params.id,
      beneficiary: '',
      donor: this.props.currentUser.user._id,
      products: [],
    },
    donationIsReady: false,
  };

  componentDidMount() {
    const { token, role, getShop, getProducts } = this.props;
    const shopkeeperId = this.props.match.params.id;
    getShop(role, token, shopkeeperId);
    getProducts(shopkeeperId);
  }

  componentDidUpdate() {
    const input = document.querySelector('#beneficiary-search-input');
    if (input) {
      input.addEventListener('blur', function() {
        setTimeout(function() {
          document.querySelector('.suggests').classList.remove('d-block');
          document.querySelector('.suggests').classList.add('d-none');
        }, 50);
      });
    }
  }

  clickSuggest = evt => {
    document.querySelector('#beneficiary-search-input').value = evt.target.innerHTML;
    this.setState(
      {
        ...this.state,
        donation: {
          ...this.state.donation,
          beneficiary: evt.target.dataset.id,
        },
      },
      () => {
        this.isDonationReady();
      },
    );
  };

  isDonationReady = () => {
    if (
      this.state.donation.beneficiary !== '' &&
      this.state.donation.shopkeeper !== '' &&
      this.state.donation.donor !== '' &&
      this.state.donation.products.length > 0 &&
      this.state.selectedProductsTotal > 0
    ) {
      this.setState({
        ...this.state,
        donationIsReady: true,
      });
      return true;
    } else {
      this.setState({
        ...this.state,
        donationIsReady: false,
      });
      return false;
    }
  };

  inputSearchBeneficiary = evt => {
    if (evt.target.value.length < 1) {
      document.querySelector('.suggests').classList.remove('d-block');
      //document.querySelector('.suggests').classList.add('d-none');
    } else {
      document.querySelector('.suggests').classList.remove('d-none');
      document.querySelector('.suggests').classList.add('d-block');
    }
    const { searchBeneficiary, token } = this.props;
    this.setState(
      {
        donation: {
          ...this.state.donation,
          beneficiary: evt.target.value,
        },
      },
      () => {
        this.isDonationReady();
      },
    );
    searchBeneficiary(evt.target.value, token);
  };

  changeDonationTotal = evt => {
    if (evt.target.type === 'checkbox')
      if (evt.target.checked) {
        const tempTotal = this.state.selectedProductsTotal + parseFloat(evt.target.dataset.price);
        this.setState(
          {
            selectedProductsTotal: Math.round(tempTotal * 100) / 100,
            donation: {
              ...this.state.donation,
              products: [...this.state.donation.products, evt.target.dataset.id],
            },
          },
          () => {
            this.isDonationReady();
          },
        );
      } else {
        const tempTotal = this.state.selectedProductsTotal - parseFloat(evt.target.dataset.price);
        const tempProducts = this.state.donation.products;
        var index = tempProducts.indexOf(evt.target.dataset.id);
        if (index > -1) {
          tempProducts.splice(index, 1);
        }
        this.setState(
          {
            selectedProductsTotal: Math.round(tempTotal * 100) / 100,
            donation: {
              ...this.state.donation,
              products: tempProducts,
            },
          },
          () => {
            this.isDonationReady();
          },
        );
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

  submitDonation = evt => {
    evt.preventDefault();
    const { sendDonation, token } = this.props;
    sendDonation(this.state.donation, token);
  };

  render() {
    const { shop, products, role, beneficiariesSuggests } = this.props;
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
              {products &&
                shop &&
                (role === 'beneficiary' || role === 'shopkeeper' || role === 'donor') && (
                  <>
                    <div className="mb-2 table-header d-flex justify-content-between align-items-center">
                      <p className="font-weight-bold">
                        {role === 'donor' && products.length > 0 && (
                          <>1 - Sélectionnez les produits que vous désirez offrir</>
                        )}
                        {role === 'shopkeeper' && (
                          <>Liste des produits disponibles dans votre établissement</>
                        )}
                      </p>
                    </div>
                    {products.length > 0 ? (
                      <form
                        className="mt-2 mb-4 form-inline"
                        onSubmit={this.submitDonation}
                        onInput={this.changeDonationTotal}
                        autoComplete="off"
                      >
                        <table className="table text-left">
                          <thead>
                            <tr className="text-muted">
                              <th scope="col">Produit</th>

                              {role !== 'beneficiary' && (
                                <>
                                  <th scope="col">Prix</th>
                                  <th scope="col">
                                    {role === 'donor'
                                      ? 'Sélection'
                                      : role === 'shopkeeper'
                                      ? 'Action'
                                      : 'Quantité'}
                                  </th>
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
                                    <small class="d-block text-muted">{product.description}</small>
                                  )}
                                </td>
                                {role !== 'beneficiary' && (
                                  <>
                                    <td>{product.price}€</td>
                                    <td className="selector text-center">
                                      {role === 'donor' && (
                                        <input
                                          type="checkbox"
                                          value="1"
                                          data-id={product._id}
                                          data-price={product.price}
                                        />
                                      )}
                                      {role === 'shopkeeper' && (
                                        <div className="action-links">
                                          <Link to={`/edit-product/${product._id}`}>Editer</Link>
                                          <span
                                            className="text-primary"
                                            onClick={this.clickDeleteProduct}
                                            data-id={product._id}
                                          >
                                            Supprimer
                                          </span>
                                        </div>
                                      )}
                                    </td>
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                          {role === 'donor' && (
                            <tfoot>
                              <tr>
                                <th scope="row">Total</th>
                                <td>{this.state.sele}€</td>
                                <td />
                              </tr>
                            </tfoot>
                          )}
                        </table>

                        {role === 'donor' && (
                          <>
                            <p className="font-weight-bold">
                              2 - Affectez votre don à un bénéficiaire
                            </p>
                            <div
                              className="d-flex mt-2 align-items-start"
                              style={{ width: '100%' }}
                            >
                              <div className="d-flex flex-column">
                                <div className="form-group">
                                  <label htmlFor="beneficiary-search-input">Bénéficiaire : </label>
                                  <div className="suggests-container">
                                    <input
                                      type="text"
                                      className="form-control mx-2"
                                      id="beneficiary-search-input"
                                      name="beneficiary"
                                      placeholder="ex : Jane Doe"
                                      aria-describedby="beneficiaryHelp"
                                      onChange={this.inputSearchBeneficiary}
                                    />
                                    <div className="suggests d-none">
                                      {beneficiariesSuggests.map(suggest => {
                                        return (
                                          <div
                                            className="suggest"
                                            key={suggest._id}
                                            onClick={this.clickSuggest}
                                            data-id={suggest._id}
                                          >
                                            {suggest.username}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                                <small id="beneficiaryHelp" className="form-text text-muted">
                                  Entrez le nom d'utilisateur ou un nom libre.
                                </small>
                              </div>

                              <input
                                type="submit"
                                className="btn btn-custom-accent ml-auto btn-lg"
                                name="submitProductSelector"
                                value="Valider la donation"
                              />
                            </div>
                          </>
                        )}
                      </form>
                    ) : role === 'shopkeeper' ? (
                      <EmptyState message="Vous n'avez pas encore ajouté de produit." />
                    ) : (
                      (role === 'donor' || role === 'beneficiary') && (
                        <EmptyState
                          message="Cet établissement n'a aucun produit disponible pour le moment"
                          link={{ label: 'Retour à la liste', url: '/shopkeeper' }}
                          className="mb-5"
                        />
                      )
                    )}
                    {role === 'shopkeeper' && (
                      <div className="text-center mb-5">
                        <Link
                          exact
                          to="/add-product"
                          path="/add-product"
                          className="btn btn-outline-primary"
                        >
                          Ajouter un produit
                        </Link>
                      </div>
                    )}
                  </>
                )}
            </div>
            <div className="col-md-12 col-lg-4">
              {/* {shop && <BlocCoordonneesHoraires shop={shop} />} */}
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
      </>
    );
  }
}

export default withRouter(ShopkeeperDetails);

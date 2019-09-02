/* React */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

/* Packages */
// import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';

/* Local Components */
import Header from 'components/Header';
import EmptyState from 'components/EmptyState';
import Suggest from 'components/Suggest';
import Error403 from 'components/Error403';

/* utils & data */
import defaultAvatar from 'assets/img/default-avatar.png';

/* Css */
import './beneficiary.scss';

class Beneficiary extends React.Component {
  state = {
    location: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
    scriptLoaded: false,
    isGeoLocAccessible: true,
    itemsOrderedByDistance: [],
    beneficiaries: [],
    suggest: { id: '', name: '' },
    suggestSubmit: false,
  };
  // Avant d'afficher le composant on récupère la localisation via le navigateur et l'ensemble des shops
  componentDidMount = () => {
    document.title = `Personnes à proximité - Aider son prochain`;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(
            {
              isGeoLocAccessible: true,
              location: {
                latitude: Number(position.coords.latitude),
                longitude: Number(position.coords.longitude),
              },
            },
            () => {
              const { latitude, longitude } = this.state.location;
              this.getBeneficiaries(latitude, longitude, 30);
            },
          );
        },
        err => {
          this.setState({
            isGeoLocAccessible: false,
          });
        },
      );
    } else {
      this.setState({
        isGeoLocAccessible: false,
      });
    }
  };

  getBeneficiaries = (latitude, longitude, km) => {
    const { role, token } = this.props;
    axios
      .post(
        `${process.env.REACT_APP_API_URL_DEV}/${role}/beneficiaries-distance`,
        { latitude, longitude, km },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        this.setState({
          itemsOrderedByDistance: [...response.data.beneficiariesDistance],
          beneficiaries: [...response.data.beneficiariesDistance],
          isGeoLocAccessible: true,
        });
      })
      .catch(e => {
        console.log('Impossible de récupérer les beneficiaires', e);
      });
  };

  // Soumission du formulaire avec adresse manuelle
  submitAskLocation = async evt => {
    evt.preventDefault();
    const { latitude, longitude } = this.state.location;
    if (latitude !== 0) {
      await this.getBeneficiaries(latitude, longitude, 30);
    }
  };

  onChangeSelect = evt => {
    const maxDist = evt.target.value;
    const { latitude, longitude } = this.state.location;
    this.getBeneficiaries(latitude, longitude, maxDist);
  };

  // ajout
  onLoad = () => {
    if (!this.state.scriptLoaded) {
      this.setState({
        scriptLoaded: true,
      });
    }
  };

  handleChange = address => {
    this.setState(state => ({
      location: { ...this.state.location, address },
    }));
  };

  handleSelect = address => {
    this.setState(state => ({
      location: { ...this.state.location, address },
    }));

    geocodeByAddress(address)
      .then(result => {
        this.setState(state => ({
          location: { ...this.state.location, address: result[0].formatted_address },
        }));
        return getLatLng(result[0]);
      })
      .then(latLng => {
        this.setState(state => ({
          location: { ...this.state.location, latitude: latLng.lat, longitude: latLng.lng },
        }));
      })
      .catch(error => console.error('Error', error));
  };

  // search by name
  handleSuggestSelect = select => {
    this.setState({
      suggest: { id: select._id, name: select.username },
      suggestSubmit: true,
    });
  };

  searchSuggestClear = value => {};

  suggestSubmit = e => {
    e.preventDefault();
    this.setState({
      suggestSubmit: true,
    });
  };

  render() {
    const {
      beneficiaries,
      isGeoLocAccessible,
      location,
      scriptLoaded,
      suggestSubmit,
      suggest,
    } = this.state;
    const { currentUser, role, token } = this.props;

    if (currentUser.user !== undefined && role !== 'shopkeeper') {
      return (
        <div className="beneficiaries">
          <Script
            url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`}
            onLoad={this.onLoad}
          />
          <Header title="Bénéficiaires à proximité" theme="dark" />
          {isGeoLocAccessible && location.latitude === 0 && (
            <EmptyState
              className="mt-5"
              message="Oops, Veuillez nous accorder l'autorisation d'utiliser votre gélocalisation"
            />
          )}

          {!isGeoLocAccessible && scriptLoaded && (
            <>
              <div className="container beneficiary-list">
                <div className="row">
                  <div className="col">
                    <p>
                      Votre géolocalisation n'a pas pu être trouvée, veuillez l'autoriser dans votre
                      navigateur ou renseigner une adresse.
                    </p>
                    <br />
                    <h5>Trouver des bénéficiaires dont leur position a été renseignée</h5>
                    <form onSubmit={this.submitAskLocation}>
                      <PlacesAutocomplete
                        value={location.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div>
                            <input
                              {...getInputProps({
                                placeholder: 'Entrez une adresse',
                                className: 'location-search-input form-control',
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map(suggestion => {
                                const className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                      <input
                        type="submit"
                        value="valider"
                        className="btn btn-primary mt-4"
                        name="submitAskLocation"
                      />
                    </form>
                  </div>
                </div>
              </div>

              <div className="container mt-5 mb-5 beneficiary-list">
                <div className="row">
                  <div className="col">
                    <h5>
                      Trouver des bénéficiaires par leur nom
                      <br />
                      <span className="small">
                        (incluant ce dont leur position n'a pas été renseignée)
                      </span>
                    </h5>

                    <form onSubmit={this.suggestSubmit}>
                      <div className="d-flex flex-column">
                        <div className="form-group">
                          <Suggest
                            role={role}
                            token={token}
                            who="beneficiary"
                            handleSuggestSelect={this.handleSuggestSelect}
                            searchSuggestClear={this.searchSuggestClear}
                            list={true}
                          />
                          <input
                            type="submit"
                            value="valider"
                            className="btn btn-primary mt-4"
                            name="submitSuggest"
                          />
                          {suggestSubmit && <Redirect to={`/beneficiary/${suggest.id}`} />}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}

          {isGeoLocAccessible && (
            <div className="container py-5 beneficiary-list">
              <div className="row my-3">
                <div className="col-12">
                  <form className="form-inline d-flex justify-content-between">
                    <div className="form-group">
                      <label className="inline-form-label" htmlFor="exampleFormControlSelect1">
                        Distance maxi :
                      </label>
                      <select
                        className="form-control form-control-sm"
                        id="selectDistance"
                        onChange={this.onChangeSelect}
                        defaultValue={30}
                      >
                        <option value="1">1 km</option>
                        <option value="2">2 km</option>
                        <option value="3">3 km</option>
                        <option value="4">4 km</option>
                        <option value="5">5 km</option>
                        <option value="10">10 km</option>
                        <option value="20">20 km</option>
                        <option value="30">30 km</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
              {beneficiaries !== undefined && beneficiaries.length > 0 && (
                <div className="row">
                  {beneficiaries.map(beneficiary => {
                    return (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4" key={beneficiary._id}>
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={
                              beneficiary.avatar
                                ? `data:image/jpg;base64,${beneficiary.avatar}`
                                : defaultAvatar
                            }
                            alt={beneficiary.username}
                          />
                          <div className="card-body">
                            <h4 className="card-title mb-0">{beneficiary.username}</h4>

                            {beneficiary.distance && beneficiary.distance !== 0 && (
                              <div className="distance card-subtitle mt-3 text-muted text-small d-inline-flex align-items-center">
                                <FaMapMarkerAlt size=".75rem" color="#bbb" />
                                <span className="ml-1">{beneficiary.distance} km</span>
                              </div>
                            )}

                            {beneficiary.distance && beneficiary.distance === 0 && (
                              <div
                                className={
                                  `distance card-subtitle mt-3 text-muted text-small d-inline-flex align-items-center` +
                                    !beneficiary.distance &&
                                  ' distance card-subtitle mt-3 text-muted text-small d-inline-flex align-items-center border-none'
                                }
                              >
                                <FaMapMarkerAlt size=".75rem" color="#bbb" />
                                <span className="ml-1">Non renseigné</span>
                              </div>
                            )}
                          </div>
                          <Link to={`/beneficiary/${beneficiary._id}`} className="stretched-link" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {beneficiaries.length === 0 && (
                <>
                  <div className="row">
                    <div className="col">
                      <EmptyState
                        className="mt-5"
                        message="Oops, aucun bénéficiaire n'a été trouvé dans la zone selectionnée"
                      />
                    </div>
                  </div>
                  <div className="container mt-5 mb-5 beneficiary-list">
                    <div className="row">
                      <div className="col">
                        <h5>
                          Trouver des bénéficiaires par leur nom
                          <br />
                          <span className="small">
                            (incluant ce dont leur position n'a pas été renseignée)
                          </span>
                        </h5>

                        <form onSubmit={this.suggestSubmit}>
                          <div className="d-flex flex-column">
                            <div className="form-group">
                              <Suggest
                                token={token}
                                handleBeneficiarySelect={this.handleBeneficiarySelect}
                                list={true}
                              />
                              <input
                                type="submit"
                                value="valider"
                                className="btn btn-primary mt-4"
                                name="submitSuggest"
                              />
                              {suggestSubmit && <Redirect to={`/beneficiary/${suggest.id}`} />}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <Error403 message="Vous ne pouvez pas accéder à cette page, vous n'êtes pas connectés" />
      );
    }
  }
}

Beneficiary.propTypes = {
  role: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default Beneficiary;

/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Packages */
import { Link, Redirect } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';

/* Local Components */
import Header from 'components/Header';
import EmptyState from 'components/EmptyState';
import Suggest from 'components/Suggest';
import Error403 from 'components/Error403';

import defaultAvatar from 'assets/img/default-avatar.png';

class Shopkeeper extends React.Component {
  state = {
    location: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
    scriptLoaded: false,
    isGeoLocAccessible: true,
    itemsOrderedByDistance: [],
    shops: [],
    shopsByName: [],
    suggest: { id: '', name: '' },
    suggestSubmit: false,
  };

  componentDidMount = () => {
    document.title = `Commerces à proximité - Aider son prochain`;

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
              this.getShops(latitude, longitude, 30);
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

  getShops = (latitude, longitude, km) => {
    const { role, token } = this.props;
    axios
      .post(
        `${process.env.REACT_APP_API_URL_DEV}/${role}/shopkeepers-distance`,
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
          itemsOrderedByDistance: [...response.data.shopkeepers],
          shops: [...response.data.shopkeepers],
          isGeoLocAccessible: true,
        });
      })
      .catch(e => {
        console.log('Impossible de récupérer les shops', e);
      });
  };

  submitAskLocation = async evt => {
    evt.preventDefault();
    const { latitude, longitude } = this.state.location;
    if (latitude !== 0) {
      await this.getShops(latitude, longitude, 30);
    }
  };

  onChangeSelect = evt => {
    const maxDist = evt.target.value;
    const { latitude, longitude } = this.state.location;
    this.getShops(latitude, longitude, maxDist);
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
  searchSuggestClear = value => {};

  handleSuggestSelect = select => {
    this.setState({
      suggest: { id: select._id, name: select.username },
      suggestSubmit: true,
    });
  };

  suggestSubmit = e => {
    e.preventDefault();
    this.setState({
      suggestSubmit: true,
    });
  };

  render() {
    const {
      shops,
      isGeoLocAccessible,
      location,
      scriptLoaded,
      suggestSubmit,
      suggest,
    } = this.state;
    const { currentUser, role, token } = this.props;
    if (currentUser.user !== undefined && role !== 'shopkeeper') {
      return (
        <>
          <Script
            url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`}
            onLoad={this.onLoad}
          />
          <Header title="Commerces à proximité" theme="dark" />
          {isGeoLocAccessible && location.latitude === 0 && (
            <EmptyState
              className="mt-5"
              message="Oops, Veuillez nous accorder l'autorisation d'utiliser votre gélocalisation"
            />
          )}

          {!isGeoLocAccessible && scriptLoaded && (
            <>
              <div className="container mb-5 shopkeeper-list">
                <div className="row">
                  <div className="col">
                    <p>
                      Votre géolocalisation n'a pas pu être trouvée, veuillez l'autoriser dans votre
                      navigateur ou renseigner une adresse.
                    </p>
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
              <div className="container mb-5 shop-list">
                <div className="row">
                  <div className="col">
                    <h5>Trouver des commerçants par leur nom</h5>

                    <form onSubmit={this.suggestSubmit}>
                      <div className="d-flex flex-column">
                        <div className="form-group">
                          <Suggest
                            role={role}
                            token={token}
                            who="shopkeeper"
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
                          {suggestSubmit && <Redirect to={`/shopkeeper/${suggest.id}`} />}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}

          {isGeoLocAccessible && (
            <div className="container py-5 shopkeeper-list">
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
              {shops !== undefined && shops.length > 0 && (
                <div className="row">
                  {shops.map(shop => {
                    return (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4" key={shop._id}>
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={
                              shop.avatar ? `data:image/jpg;base64,${shop.avatar}` : defaultAvatar
                            }
                            alt={shop.shopkeeper_name}
                          />
                          <div className="card-body">
                            <h4 className="card-title f2nt-3eight-bold">{shop.shopkeeper_name}</h4>
                            {(shop.distance || shop.distance !== 0) && (
                              <div className="distance card-subtitle mt-3 text-muted text-small d-inline-flex align-items-center">
                                <FaMapMarkerAlt size=".75rem" color="#bbb" />
                                <span className="ml-1">{shop.distance} km</span>
                              </div>
                            )}
                            {(!shop.distance || shop.distance === 0) && (
                              <div
                                className={
                                  `distance card-subtitle mt-3 text-muted text-small d-inline-flex align-items-center` +
                                    !shop.distance &&
                                  ' distance card-subtitle mt-3 text-muted text-small d-inline-flex align-items-center border-none'
                                }
                              >
                                <FaMapMarkerAlt size=".75rem" color="#bbb" />
                                <span className="ml-1">Non renseigné</span>
                              </div>
                            )}
                          </div>
                          <Link to={`/shopkeeper/${shop._id}`} className="stretched-link" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {shops.length === 0 && (
                <div className="row">
                  <div className="col">
                    <EmptyState
                      className="mt-5"
                      message="Oops, aucun commerce n'a été trouvé dans la zone selectionnée"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      );
    } else {
      return (
        <Error403 message="Vous ne pouvez pas accéder à cette page, vous n'êtes pas connectés" />
      );
    }
  }
}

Shopkeeper.propTypes = {
  currentUser: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default Shopkeeper;

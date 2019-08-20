import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import Input from 'components/Input';
import { Link, withRouter } from 'react-router-dom';

import { updateAvatar } from 'utils';

const BeneficiaryProfilUpdate = ({ currentUser, updateProfile, role, token }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({});
  const [description, setDescritpion] = useState('');

  // useEffect(() => {
  //   if (currentUser.user.description === '') {
  //     setDescritpion('  Description non renseignée');
  //   } else if (currentUser.user.description !== '') {
  //     setDescritpion(`  ${currentUser.user.description}`);
  //   }
  // }, [description, currentUser.user.description]);

  const onLoad = () => {
    if (!scriptLoaded) {
      setScriptLoaded(true);
    }
  };

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    setAddress(address);

    geocodeByAddress(address)
      .then(result => {
        setAddress(result[0].formatted_address);
        return getLatLng(result[0]);
      })
      .then(latLng => {
        setLocation({
          address: address,
          latitude: latLng.lat,
          longitude: latLng.lng,
        });
      })
      .catch(error => console.error('Error', error));
  };

  const handleDescription = e => {
    e.preventDefault();
    setDescritpion(e.target.value);
  };

  const handleFile = e => {
    e.preventDefault();
    updateAvatar(e, role, token);
  };

  const onUpdate = e => {
    e.preventDefault();
    const data = {};
    Array.from(e.target).forEach(el => {
      if (el.value !== '' && el.name !== '') {
        data[el.name] = el.value;
      }
    });
    delete data.avatar;

    if (location.address) {
      data.location = location;
    }

    updateProfile(data, role, token);
  };

  return (
    <>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${
          process.env.REACT_APP_GOOGLE_MAP_API
        }&libraries=places`}
        onLoad={onLoad}
      />

      {scriptLoaded && (
        <form className="mb-4" onSubmit={onUpdate}>
          <h2>Mes informations personnelles</h2>
          <Input
            type="text"
            label="Adresse email"
            name="email"
            id="email"
            placeholder={currentUser.user.email ? currentUser.user.email : 'non renseigné'}
            disabled={true}
          />
          <Input
            type="text"
            label="Nom d'utilisateur"
            name="username"
            id="username"
            placeholder={currentUser.user.username}
            disabled={true}
            fieldHelp={"Votre nom d'utilisateur et votre email ne peuvent pas être modifiés."}
          />
          <Input
            type="text"
            name="firstname"
            placeholder={currentUser.user.firstname ? currentUser.user.firstname : 'non renseigné'}
            className="form-control"
            label="Prénom"
          />
          <Input
            type="text"
            name="lastname"
            className="form-control"
            placeholder={currentUser.user.lastname ? currentUser.user.lastname : 'non renseigné'}
            label="Nom"
          />
          <h2 className="mt-5">Mon mot de passe</h2>
          <Input
            type="password"
            name="password"
            className="form-control"
            label="Nouveau mot de passe"
            placeholder="Nouveau mot de passe"
          />
          <h2 className="mt-5">Mes informations de bénéficiaire</h2>
          <div className="form-group">
            <label htmlFor="">Adresse de votre commerce</label>
            <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
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
          </div>

          <label className="form-group-label mt-3" htmlFor="description">
            Description
          </label>
          <div className="form-group d-flex">
            <textarea
              className={
                currentUser.user.description.trim() !== '' ? 'form-control w-50' : 'form-control'
              }
              name="description"
              rows="5"
              value={description}
              onChange={handleDescription}
            />
            {currentUser.user.description.trim() !== '' && (
              <p className="ml-3 text-small">
                Description actuelle: <br />
                {currentUser.user.description}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="avatar">Votre avatar</label>
            <input
              type="file"
              className="form-control-file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={e => handleFile(e)}
            />
          </div>
          <div className="text-right mt-5">
            <Link to="/profil" exact path="/profil" className="btn btn-outline-secondary">
              Retour au profil
            </Link>
            <button type="submit" className="btn btn-primary ml-4">
              Confirmer
            </button>
          </div>
        </form>
      )}
    </>
  );
};

BeneficiaryProfilUpdate.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default withRouter(BeneficiaryProfilUpdate);

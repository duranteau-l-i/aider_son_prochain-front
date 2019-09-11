import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import Header from 'components/Header';
import Input from 'components/Input';
import Shopkeeper from './shopkeeper';
import Beneficiary from './beneficiary';
import Modal from 'containers/Modal';

import './register.scss';

const Register = props => {
  const { submitRegister } = props;
  const role = props.match.params.role;

  let roleTitle = '';

  role === 'beneficiary'
    ? (roleTitle = 'bénéficiaire')
    : role === 'donor'
    ? (roleTitle = 'donateur')
    : (roleTitle = 'commerçant');

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({});

  useEffect(() => {
    document.title = `Inscription ${roleTitle} - Aider son prochain`;
  });

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

  const submitRegisterForm = e => {
    e.preventDefault();

    const categories = [];

    if (e.target.categories) {
      Array.from(e.target.categories).forEach(cat => {
        if (cat.checked) categories.push(cat.value);
      });
    }

    const data = {};
    Array.from(e.target).forEach(el => {
      if (el.value !== '' && el.name !== '') {
        data[el.name] = el.value;
      }
    });

    if (data.location) {
      data.location = location;
    }

    if (data.categories) {
      data.categories = categories;
    }

    submitRegister(data, role);
  };

  return (
    <>
      <div className="register"></div>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`}
        onLoad={onLoad}
      />
      {scriptLoaded && (
        <>
          <Header
            title="Bienvenue !"
            subtitle={`Inscription ${roleTitle}`}
            theme="dark"
            page="register"
          />

          <div className="container register">
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-6">
                <form onSubmit={submitRegisterForm}>
                  <h3>Vos identifiants</h3>
                  <Input
                    type="text"
                    label="Nom d'utilisateur"
                    name="username"
                    id="username"
                    placeholder="Pseudo"
                    required={true}
                    minLength={3}
                  />
                  <Input
                    type="email"
                    label="Adresse email"
                    name="email"
                    id="email"
                    placeholder="email@societe.com"
                    required={role !== 'beneficiary' ? true : false}
                  />
                  <Input
                    type="password"
                    label="Mot de passe"
                    name="password"
                    id="password"
                    required={true}
                    minLength={6}
                  />
                  <h3 className="topSectionH3 mt-5">Votre profil</h3>

                  <Input
                    type="text"
                    label="Prénom"
                    name="firstname"
                    id="firstname"
                    placeholder="Votre prénom"
                    required={role !== 'beneficiary' ? true : false}
                  />
                  <Input
                    type="text"
                    label="Nom"
                    name="lastname"
                    id="lastname"
                    placeholder="Votre nom"
                    required={role !== 'beneficiary' ? true : false}
                  />

                  {role === 'shopkeeper' && (
                    <Shopkeeper value={address} onChange={handleChange} onSelect={handleSelect} />
                  )}
                  {role === 'beneficiary' && (
                    <Beneficiary value={address} onChange={handleChange} onSelect={handleSelect} />
                  )}

                  <button type="submit" className="mt-4 btn btn-primary btn-block">
                    Continuer
                  </button>
                </form>
              </div>
            </div>
          </div>
          <Modal
            title="Inscription"
            message="Vous avez été enregistré avec succès"
            messageError="Une erreur est survenue, veuillez reessayer"
            page="login"
          />
        </>
      )}
    </>
  );
};

Register.propTypes = {
  submitRegister: PropTypes.func.isRequired,
};

export default withRouter(Register);

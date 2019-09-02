import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import { Link, withRouter } from 'react-router-dom';

import { updateAvatar } from 'utils';

import './profilUpdate.scss';

const DonorProfilUpdate = ({ currentUser, updateProfile, role, token }) => {
  const handleFile = e => {
    e.preventDefault();
    updateAvatar(e, role, token);
  };

  const onUpdate = e => {
    e.preventDefault();
    const data = {};
    Array.from(e.target).forEach(el => {
      if (el.value !== '') {
        data[el.name] = el.value;
      }
    });
    delete data.avatar;
    updateProfile(data, role, token);
  };

  return (
    <>
      <form className="mb-4" onSubmit={onUpdate}>
        <h2>Mes informations personnelles</h2>
        <Input
          type="text"
          label="Adresse email"
          name="email"
          id="email"
          placeholder={currentUser.user.email}
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
          id="firstname"
          placeholder={currentUser.user.firstname}
          className="form-control"
          label="Prénom"
        />
        <Input
          type="text"
          name="lastname"
          id="lastname"
          className="form-control"
          placeholder={currentUser.user.lastname}
          label="Nom"
        />
        <h2 className="mt-5">Mon mot de passe</h2>
        <Input
          type="password"
          name="password"
          id="password"
          className="form-control"
          label="Votre mot de passe"
          placeholder="Nouveau mot de passe"
        />
        <div className="form-group">
          <label htmlFor="avatar">Votre avatar</label>
          <input
            type="file"
            className="form-control-file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFile}
          />
        </div>
        <div className="text-right mt-5">
          <Link to="/profil" path="/profil" className="btn btn-outline-secondary">
            Retour au profil
          </Link>
          <button type="submit" className="btn btn-primary ml-4">
            Confirmer
          </button>
        </div>
      </form>
    </>
  );
};

DonorProfilUpdate.propTypes = {
  currentUser: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default withRouter(DonorProfilUpdate);

import React from 'react';
import PropTypes from 'prop-types';

const Donor = ({ currentUser }) => {
  const user = currentUser.user;
  return (
    <>
      <h2>Mes informations personnelles</h2>
      <div className="profile-group mb-3">
        <p className="mb-1 font-weight-bold">Nom d'utilisateur</p>
        <span>
          {user.username && user.username !== '' && user.username !== undefined
            ? user.username
            : 'Non renseigné'}
        </span>
      </div>
      <div className="profile-group mb-3">
        <p className="mb-1 font-weight-bold">Adresse email</p>
        <span>
          {user.email && user.email !== '' && user.email !== undefined
            ? user.email
            : 'Non renseigné'}
        </span>
        <p className="text-small mt-2 text-muted">Visible uniquement par vous</p>
      </div>
      <div className="profile-group mb-3">
        <p className="mb-1 font-weight-bold">Prénom</p>
        <span>
          {user.firstname && user.firstname !== '' && user.firstname !== undefined
            ? user.firstname
            : 'Non renseigné'}
        </span>
      </div>
      <div className="profile-group mb-3">
        <p className="mb-1 font-weight-bold">Nom</p>
        <span>
          {user.lastname && user.lastname !== '' && user.lastname !== undefined
            ? user.lastname
            : 'Non renseigné'}
        </span>
      </div>
    </>
  );
};

Donor.propTypes = {
  currentUser: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
};

export default Donor;

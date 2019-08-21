import React from 'react';

const Beneficiary = ({ currentUser, role, publicProfile }) => {
  const beneficiary = currentUser.user;
  return (
    <>
      {!publicProfile && (
        <>
          <h2>Mes informations personnelles</h2>
          <div className="profile-group mb-3">
            <p className="mb-1 font-weight-bold">Nom d'utilisateur</p>
            <span>
              {beneficiary.username &&
              beneficiary.username !== '' &&
              beneficiary.username !== undefined
                ? beneficiary.username
                : 'Non renseigné'}
            </span>
          </div>
          <div className="profile-group mb-3">
            <p className="mb-1 font-weight-bold">Adresse email</p>
            <span>
              {beneficiary.email && beneficiary.email !== '' && beneficiary.email !== undefined
                ? beneficiary.email
                : 'Non renseigné'}
            </span>
            <p className="text-small mt-2 text-muted">Visible uniquement par vous</p>
          </div>

          <h2 className="mt-5">Mes informations de bénéficiaire</h2>
        </>
      )}

      <div className="profile-group mb-3">
        <p className="mb-1 font-weight-bold">Où me trouver</p>
        <span>
          {beneficiary.location && beneficiary.location.address !== '' ? (
            <>
              <span>{beneficiary.location.address}</span>
              <br />
              <a
                href={`https://maps.google.com/?q=${beneficiary.location.latitude},${
                  beneficiary.location.longitude
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir sur la carte
              </a>
            </>
          ) : (
            'Aucune adresse enregistrée'
          )}
        </span>
      </div>

      <div className="profile-group mb-3">
        <p className="mb-1 font-weight-bold">Description</p>
        <>
          {beneficiary.description &&
            beneficiary.description.trim() === '' &&
            'Aucune description enregistrée'}

          {beneficiary.description && beneficiary.description.trim() !== '' && (
            <>
              {beneficiary.description.split('.').map(d => (
                <p key={d} className="m-0 text-small">
                  {' '}
                  {d}{' '}
                </p>
              ))}
            </>
          )}
        </>
      </div>
    </>
  );
};

export default Beneficiary;

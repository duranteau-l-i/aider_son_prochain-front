import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultAvatar from 'assets/img/default-avatar.png';

const ProfilHeader = ({ user, role, update, publicProfile = false }) => {
  return (
    <>
      <header className="d-flex justify-content-between mb-5">
        <div className="row d-flex">
          <div className="col col-xs-12 col-sm-12 col-md-6 text-center mt-3">
            <img
              className="rounded-circle border border-warning w-75"
              src={user.avatar ? `data:image/jpg;base64,${user.avatar}` : defaultAvatar}
              alt={role === 'shopkeeper' ? user.shopkeeper_name : user.username}
            />
            {!update && !publicProfile && (
              <Link to="/profil-update" className="text-center btn btn-sm btn-link mt-2">
                Editer mon profil
              </Link>
            )}
          </div>
          <div className="col col-xs-12 col-sm-12 col-md-6 align-self-center mt-3">
            <h3 className="">{user.username}</h3>
            <span className="text-muted text-small mt-1">
              {role === 'shopkeeper'
                ? 'Commerçant'
                : role === 'donor'
                ? 'Donateur'
                : 'Bénéficiaire'}
            </span>
            <p className="mt-2 text-muted text-small">
              <>
                {role === 'shopkeeper' && user.shopkeeper_name ? (
                  <>
                    <b>Nom de l'établissement:</b>
                    <br /> {user.shopkeeper_name}
                    <br />
                  </>
                ) : (
                  ''
                )}
                {user.phone ? (
                  <>
                    <b>Téléphone:</b>{' '}
                    {`0${user.phone.toString().substring(0, 1)}-0${user.phone
                      .toString()
                      .substring(2, 3)}-0${user.phone
                      .toString()
                      .substring(4, 5)}-0${user.phone
                      .toString()
                      .substring(6, 7)}-0${user.phone.toString().substring(8, 9)}`}
                    <br />
                  </>
                ) : (
                  ''
                )}
                {role === 'shopkeeper' && user.email ? (
                  <>
                    <b>Email:</b> {user.email}
                    <br />
                  </>
                ) : (
                  ''
                )}
                {user.categories ? (
                  <>
                    <b>Catégories:</b> {user.categories.join(', ')}
                  </>
                ) : (
                  ''
                )}
              </>
            </p>
          </div>
        </div>
      </header>
    </>
  );
};

ProfilHeader.propTypes = {
  user: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
};

export default ProfilHeader;

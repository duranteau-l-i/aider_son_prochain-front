import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CurrentUser = ({ currentUser, role, deconnexion }) => {
  const onDeconnexion = () => {
    deconnexion(currentUser.token, role);
  };
  return (
    <>
      {currentUser.user !== undefined && (
        <li className="nav-item dropdown">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {currentUser.user.username} ({role})
          </a>

          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            {role === 'donor' && (
              <>
                <Link exact to="/beneficiary" className="nav-link">
                  Personnes&nbsp;à&nbsp;proximité
                </Link>
                <Link exact to="/shopkeeper" className="nav-link">
                  Commerces&nbsp;à&nbsp;proximité
                </Link>
                <Link exact to="/donations" className="nav-link">
                  Mes&nbsp;dons
                </Link>
              </>
            )}
            {role === 'shopkeeper' && (
              <>
                <Link exact to="/donations" className="nav-link">
                  Suivi&nbsp;des&nbsp;transactions
                </Link>
              </>
            )}
            {role === 'beneficiary' && (
              <>
                <Link exact to="/shopkeeper" className="nav-link">
                  Commerces&nbsp;à&nbsp;proximité
                </Link>
                <Link exact to="/donations" className="nav-link">
                  Mes&nbsp;dons
                </Link>
              </>
            )}
            <Link exact to="/profil" className="nav-link">
              Mon&nbsp;profil
            </Link>
            <Link exact to="/" className="nav-link text-danger" onClick={onDeconnexion}>
              Déconnexion
            </Link>
          </div>
        </li>
      )}
    </>
  );
};

CurrentUser.propTypes = {
  currentUser: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  deconnexion: PropTypes.func.isRequired,
};

export default CurrentUser;

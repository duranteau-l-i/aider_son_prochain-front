import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link, withRouter } from 'react-router-dom';

import Currentuser from './Currentuser';
import RegisterDropdown from './RegisterDropdown';

import './nav.scss';
import logo from '../../assets/img/logo.png';

const Nav = ({ currentUser, role, deconnexion, match }) => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark`}>
      <Link key="/logo" className="navbar-brand" to="/">
        <img src={logo} alt="logo-atp" />{' '}
        <span className="font-weight-bold">AIDER SON PROCHAIN</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to="/" key="/" className="nav-link" activeClassName="active">
              Accueil
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" key="/contact" className="nav-link" activeClassName="active">
              Contact
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {currentUser.user === undefined && (
            <>
              <RegisterDropdown />
              <li className="nav-item">
                <NavLink to="/login" key="/login" className="nav-link">
                  Connexion
                </NavLink>
              </li>
            </>
          )}
          {currentUser.user !== undefined && (
            <Currentuser currentUser={currentUser} role={role} deconnexion={deconnexion} />
          )}
        </ul>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  currentUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  deconnexion: PropTypes.func.isRequired,
};

export default withRouter(Nav);

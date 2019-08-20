import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link, withRouter } from 'react-router-dom';

import CurrentUser from './currentUser';
import RegisterDropdown from './RegisterDropdown';

import './nav.scss';
import logo from '../../assets/img/logo-atp-blanc.png';

const Nav = ({ currentUser, role, theme, deconnexion, match }) => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme}`}>
      <Link key="/logo" className="navbar-brand" to="/">
        <img src={logo} alt="logo-atp" />
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
            <NavLink exact to="/" key="/" className="nav-link" activeClassName="active">
              Accueil
            </NavLink>
          </li>
          {/* {match.path === '/' && (
            <li className="nav-item">
              <a className="nav-link" href="#qui-sommes-nous">
                Qui sommes-nous
              </a>
            </li>
          )}
          {match.path === '/' && (
            <li className="nav-item">
              <a className="nav-link" href="#comment-ca-marche">
                Comment ça marche
              </a>
            </li>
          )} */}
          <li className="nav-item">
            <NavLink
              exact
              to="/contact"
              key="/contact"
              className="nav-link"
              activeClassName="active"
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {currentUser.user === undefined && (
            <>
              <RegisterDropdown />
              <li className="nav-item">
                <NavLink exact to="/login" key="/login" className="nav-link">
                  Connexion
                </NavLink>
              </li>
            </>
          )}
          {currentUser.user !== undefined && (
            <CurrentUser currentUser={currentUser} role={role} deconnexion={deconnexion} />
          )}
        </ul>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  currentUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(Nav);

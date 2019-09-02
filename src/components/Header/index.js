import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';
import Nav from 'containers/Nav';

class Header extends React.Component {
  render() {
    const { page, title, subtitle } = this.props;

    if (page === 'home') {
      return (
        <header className="home-header">
          <Nav theme="dark" />
          <div className="container mt-4 text-white py-5">
            <div className="row justify-content-center">
              <div className="col col-lg-8 text-center">
                <h1>Lien social et dons aux personnes dans le besoin</h1>
                <p className="mt-5">
                  La plateforme recréant un lien tout en permetant de faire un geste !
                </p>
              </div>
            </div>
          </div>
        </header>
      );
    } else if (page === 'contact' || page === 'login' || page === 'register') {
      return (
        <header className="page-header mb-5">
          <Nav theme="dark" />
          <div className="header-bg">
            <div className="row justify-content-center">
              <div className="col col-lg-8 text-center">
                <h1 className="text-white">
                  {title}
                  {subtitle && <small>{subtitle}</small>}
                </h1>
              </div>
            </div>
          </div>
        </header>
      );
    } else {
      return (
        <header className="page-header">
          <Nav theme="dark" />
          <div className="py-5">
            <div className="row justify-content-center">
              <div className="col col-lg-8 text-center">
                <h1 className="text-black">
                  {title}
                  {subtitle && <small>{subtitle}</small>}
                </h1>
              </div>
            </div>
          </div>
        </header>
      );
    }
  }
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

Header.defaultProps = {
  page: '',
  title: '',
  theme: '',
  subtitle: '',
};

export default Header;

import React from 'react';
// import PropTypes from 'prop-types';

import './header.scss';
import Nav from 'containers/Nav';

class Header extends React.Component {
  render() {
    const { page, title, backgroundImage, theme, subtitle } = this.props;

    const themeValue = theme === undefined ? 'dark' : theme;
    const style = {
      backgroundImage: `url("${backgroundImage}")`,
    };
    return (
      <>
        {page === 'home' ? (
          <header className="home-header">
            <Nav theme={themeValue} />
            <div className="container mt-4 text-white py-5">
              <div className="row justify-content-center">
                <div className="col col-lg-8 text-center">
                  <h1>Lien social et dons aux personnes dans le besoin</h1>
                  <p className="mt-5">
                    I think we need to start from scratch. I'll pay you in a week we don't need to
                    pay upfront i hope you understand we are a startup, nor we don't need a
                    contract, do we or can you please change the color theme of the website
                  </p>
                  <a
                    href={`${process.env.PUBLIC_URL}/#comment-ca-marche`}
                    className="btn btn-lg btn-custom-accent font-weight-bold mt-5 mb-4"
                  >
                    Découvrir comment ça marche
                  </a>
                </div>
              </div>
            </div>
          </header>
        ) : (
          <header className="page-header mb-5">
            <Nav theme={themeValue} />
            <div className="container mt-4 py-5">
              <div className="row justify-content-center">
                <div className="col col-lg-8 text-center">
                  <h1 className="text-white">
                    {title}
                    {subtitle && <small>{subtitle}</small>}
                  </h1>
                </div>
              </div>
            </div>
            <div className="background-image" style={style} />
          </header>
        )}
      </>
    );
  }
}

Header.propTypes = {};

export default Header;

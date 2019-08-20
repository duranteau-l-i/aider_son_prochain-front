import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import Header from 'components/Header';
import Input from 'components/Input';
import './login.scss';
import loginBackgroundImage from 'assets/img/welcome.jpg';

const Login = ({ currentUser, submitLogin }) => {
  // componentDidMount() {
  //   document.title = `Connexion - Aide ton prochain`;
  // }

  const submitLoginForm = e => {
    e.preventDefault();

    const data = {};
    Array.from(e.target).forEach(el => {
      if (el.value !== '' && el.name !== '') {
        data[el.name] = el.value;
      }
    });

    submitLogin(data);
  };

  return (
    <>
      {currentUser.user !== undefined && (
        <Redirect
          to={{
            pathname: '/profil',
          }}
        />
      )}
      <Header
        title="Heureux de vous revoir !"
        subtitle="Connectez-vous à votre compte"
        theme="dark"
        backgroundImage={loginBackgroundImage}
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <form className="mt-4" onSubmit={submitLoginForm}>
              <Input
                label="Adresse email ou nom d'utilisateur"
                type="text"
                className="form-control"
                id="login"
                name="login"
                placeholder="Pseudo ou Email"
                required={true}
              />
              <Input
                label="Mot de passe"
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="******"
                required={true}
              />
              <button type="submit" className="mt-4 btn btn-primary btn-block">
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
};

export default withRouter(Login);

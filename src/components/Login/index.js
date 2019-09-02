import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import Header from 'components/Header';
import Input from 'components/Input';
import Modal from 'containers/Modal';

import './login.scss';

const Login = ({ currentUser, submitLogin }) => {
  useEffect(() => {
    document.title = `Connexion - Aider son prochain`;
  });

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
        page="login"
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
                minLength={6}
              />
              <button type="submit" className="mt-4 btn btn-primary btn-block">
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
      <Modal
        title="Connexion"
        message="connexion"
        messageError="Les informations saisies ne sont pas correct."
        page="profil"
      />
    </>
  );
};

Login.propTypes = {
  currentUser: PropTypes.object.isRequired,
  submitLogin: PropTypes.func.isRequired,
};

export default withRouter(Login);

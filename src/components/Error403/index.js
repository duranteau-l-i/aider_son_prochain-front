import React from 'react';

import { Link } from 'react-router-dom';
import Header from 'components/Header';
import './error403.scss';

const Error403 = () => (
  <>
    <Header title="Accès refusé" />
    <div className="container mt-4 py-5">
      <div className="row justify-content-center">
        <div className="col col-lg-8 text-left">
          <h2 className="text-center">Oops!</h2>
          <h2>Vous ne pouvez pas accéder à cette page, vous n'êtes pas connectés</h2>
          <Link key="/" className="btn btn-primary btn-block mt-5" to="/login">
            Retour à la page connexion
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default Error403;

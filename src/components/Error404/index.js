import React from 'react';

import { Link } from 'react-router-dom';
import Header from 'components/Header';
import './error404.scss';

const Error404 = () => (
  <>
    <Header title="Not Found !" />
    <div className="container mt-4 py-5">
      <div className="row justify-content-center">
        <div className="col col-lg-8 text-left">
          <h2 className="text-center">Oops!</h2>
          <h2>La page que vous recherchez n'a pas été trouvée.</h2>
          <Link key="/" className="btn btn-primary btn-block mt-5" to="/">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default Error404;

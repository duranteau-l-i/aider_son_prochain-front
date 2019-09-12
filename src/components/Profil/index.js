import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Donor from './Donor';
import Beneficiary from './Beneficiary';
import Shopkeeper from 'containers/Profil/shopkeeper';
import Error403 from 'components/Error403';
import ProfilHeader from 'components/Profil/ProfilHeader';
import Nav from 'containers/Nav';

import './profil.scss';

const Profil = ({ currentUser, role }) => {
  useEffect(() => {
    document.title = `Mon profil - ${process.env.REACT_APP_WEBSITE_TITLE}`;
  });

  if (currentUser.user !== undefined) {
    return (
      <>
        <Nav theme="dark" />
        <div className="container mt-5">
          <div className="row">
            <div className="col col-md-10 col-lg-10 mx-auto bg-white py-medium">
              <div className="row">
                <div className="col px-md-large">
                  <ProfilHeader
                    title={`${currentUser.user.username} (${role})`}
                    user={currentUser.user}
                    update={false}
                    role={role}
                  />
                  {role === 'beneficiary' && (
                    <Beneficiary beneficiary={currentUser.user} role={role} />
                  )}
                  {role === 'shopkeeper' && <Shopkeeper currentUser={currentUser} role={role} />}
                  {role === 'donor' && <Donor currentUser={currentUser} role={role} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <Error403 message="Vous ne pouvez pas accéder à cette page, vous n'êtes pas connectés" />
    );
  }
};

Profil.propTypes = {
  currentUser: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
};

export default withRouter(Profil);

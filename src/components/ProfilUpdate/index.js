import React from 'react';
import PropTypes from 'prop-types';
import ProfilHeader from 'components/Profil/ProfilHeader';
import Beneficiary from './Beneficiary';
import Donor from './Donor';
import Shopkeeper from './Shopkeeper';
import Error403 from 'components/Error403';
import Nav from 'containers/Nav';

import Modal from 'containers/Modal';

import './profilUpdate.scss';
import '../Profil/profil.scss';

const ProfilUpdate = ({ currentUser, role, updateProfile, token }) => {
  document.title = `Editer mon profil - Aider son prochain`;
  if (currentUser.user !== undefined) {
    return (
      <>
        <Nav theme="dark" />
        <div className="container mt-5">
          <div className="row">
            <div className="col bg-white py-md-medium">
              <div className="row">
                <div className="col px-md-large">
                  <ProfilHeader role={role} user={currentUser.user} update={true} />
                  {role === 'beneficiary' && (
                    <Beneficiary
                      currentUser={currentUser}
                      role={role}
                      updateProfile={updateProfile}
                      token={token}
                    />
                  )}
                  {role === 'shopkeeper' && (
                    <Shopkeeper
                      currentUser={currentUser}
                      role={role}
                      updateProfile={updateProfile}
                      token={token}
                    />
                  )}
                  {role === 'donor' && (
                    <Donor
                      currentUser={currentUser}
                      role={role}
                      updateProfile={updateProfile}
                      token={token}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Mise à jour du profil"
          message="Le profil a était mis à jour"
          messageError="Le profil n'a pas pu être mis à jour"
          page="profil"
        />
      </>
    );
  } else {
    return (
      <Error403 message="Vous ne pouvez pas accéder à cette page, vous n'êtes pas connectés" />
    );
  }
};

ProfilUpdate.propTypes = {
  currentUser: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default ProfilUpdate;

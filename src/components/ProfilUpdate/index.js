import React from 'react';
import PropTypes from 'prop-types';
import ProfilHeader from 'components/Profil/ProfilHeader';
import BeneficiaryProfilUpdate from './BeneficiaryProfilUpdate';
import DonorProfilUpdate from './DonorProfilUpdate';
import ShopkeeperProfilUpdate from './ShopkeeperProfilUpdate';
import Error403 from 'components/Error403';
import Nav from 'containers/Nav';

import Modal from 'containers/Modal';

import './profilUpdate.scss';
import '../Profil/profil.scss';

const ProfilUpdate = ({
  currentUser,
  role,
  updateProfile,
  updateAvatar,
  token,
  show,
  showHideModal,
}) => {
  document.title = `Editer mon profil - Aide ton prochain`;
  if (currentUser.user !== undefined) {
    return (
      <>
        <Nav theme="dark" />
        <div className="container mt-5">
          <div className="row">
            <div className="col bg-white py-md-medium">
              <div className="row">
                <div className="col px-md-large">
                  <ProfilHeader role={role} user={currentUser} update={true} />
                  {role === 'beneficiary' && (
                    <BeneficiaryProfilUpdate
                      currentUser={currentUser}
                      role={role}
                      updateProfile={updateProfile}
                      updateAvatar={updateAvatar}
                      token={token}
                    />
                  )}
                  {role === 'shopkeeper' && (
                    <ShopkeeperProfilUpdate
                      currentUser={currentUser}
                      role={role}
                      updateProfile={updateProfile}
                      updateAvatar={updateAvatar}
                      token={token}
                    />
                  )}
                  {role === 'donor' && (
                    <DonorProfilUpdate
                      currentUser={currentUser}
                      role={role}
                      updateProfile={updateProfile}
                      updateAvatar={updateAvatar}
                      token={token}
                      showHideModal={showHideModal}
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
};

export default ProfilUpdate;

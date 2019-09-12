import React from 'react';

import illustration_qsn from 'assets/img/illustration-qsn.jpg';
import mockup from 'assets/img/mockup-donation.png';

import { Link } from 'react-router-dom';
import Header from 'components/Header';
import './home.scss';

class Home extends React.Component {
  componentDidMount() {
    document.title = `${process.env.REACT_APP_WEBSITE_TITLE} - Dons et lien social avec les personnes isolées`;
  }
  render() {
    return (
      <>
        <Header page="home" />
        <section id="qui-sommes-nous" className="py-5 bg-white align-items-center">
          <div className="container page-id-home">
            <div className="row align-items-center">
              <div className="col-md-6 col-xs-12">
                <h2>Pourquoi ?</h2>
                <p>
                  Tout d'abord nous pensons que le plus grand manque de certaines personnes est la
                  sociabilisation.
                  <br />
                  Le but est avant tout de mettre en contact des personnes qui s'ignorent.
                </p>
                <p>Et celui qui peut faire plus, cela est tout à son avantage !</p>
              </div>
              <div className="col-md-6 col-xs-12 d-flex justify-content-center">
                <img className="align-self-end" src={illustration_qsn} alt="illustration SQN" />
              </div>
            </div>
          </div>
        </section>
        <section id="comment-ca-marche" className="bg-light py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 col-xs-12">
                <h2>Comment ça marche ?</h2>
                <ol id="steps-counter">
                  <li>Je vais à la rencontre d'une personne</li>
                  <li>Je lui fais un don chez un commerçant via le site</li>
                  <li>La personne consomme ce don quand elle en a envie</li>
                </ol>
                <br />
              </div>
              <div className="col-md-6 col-xs-12 d-flex justify-content-center">
                <img className="align-self-end img-mockup" src={mockup} alt="mockup donation" />
              </div>
            </div>
          </div>
        </section>
        <section id="join-us" className="py-5 bg-white">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <h2 className="mb-3">Rejoignez-nous !</h2>
                <span className="subtitle mb-5 d-block">Vous êtes...</span>
              </div>
            </div>
            <div className="row">
              {/* bloc donateur */}
              <div className="col text-center d-flex flex-column profile-col">
                <div className="profile-bloc profile-bloc-donor">Donateur</div>
                <p className="profils">
                  Prenais un peu de votre temps et si possible de votre argent.
                </p>
                <p>
                  <Link key="donorRegistration" className="btn btn-primary" to="/register/donor">
                    Nous rejoindre
                  </Link>
                </p>
              </div>

              {/* bloc bénéficiaire */}
              <div className="col text-center d-flex flex-column profile-col">
                <div className="profile-bloc profile-bloc-beneficiary">Bénéficiaire</div>
                <p className="profils">Profite d'un moment chaleureux.</p>
                <p>
                  <Link
                    key="beneficiaryRegistration"
                    className="btn btn-primary"
                    to="/register/beneficiary"
                  >
                    Nous rejoindre
                  </Link>
                </p>
              </div>

              {/* bloc commerçant */}
              <div className="col text-center d-flex flex-column profile-col">
                <div className="profile-bloc profile-bloc-shopkeeper">Commerçant</div>
                <p className="profils">Accueil et permet le contact avec des gens différents.</p>
                <p>
                  <Link
                    key="shopkeeperRegistration"
                    className="btn btn-primary"
                    to="/register/shopkeeper"
                  >
                    Nous rejoindre
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Home;

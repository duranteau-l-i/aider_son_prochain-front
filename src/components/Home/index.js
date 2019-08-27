import React from 'react';

import illustration_qsn from 'assets/img/illustration-qsn.jpg';
import mockup from 'assets/img/mockup-donation.png';

import { Link } from 'react-router-dom';
import Header from 'components/Header';
import testimonies from 'data/testimonies';
import './home.scss';

class Home extends React.Component {
  componentDidMount() {
    document.title = 'Aider son prochain - Dons et lien social avec les personnes isolées';
  }
  render() {
    return (
      <>
        <Header page="home" />
        <section id="qui-sommes-nous" className="py-5 bg-white">
          <div className="container page-id-home">
            <div className="row">
              <div className="col">
                <h2>Qui sommes-nous ?</h2>
                <p>
                  I think we need to start from scratch. I'll pay you in a week we don't need to pay
                  upfront i hope you understand we are a startup, nor we don't need a contract, do
                  we or can you please change the color theme of the website.
                </p>
                <p>
                  I got your invoice...it seems really high, why did you charge so much make it pop
                  the target audience is makes and famles aged zero and up, so try a more powerful
                  colour. I think we need.
                </p>
              </div>
              <div className="col d-none d-md-flex">
                <img className="align-self-end" src={illustration_qsn} alt="illustration SQN" />
              </div>
            </div>
          </div>
        </section>
        <section id="comment-ca-marche" className="bg-light py-5">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2>Comment ça marche ?</h2>
                <ol id="steps-counter">
                  <li>Je vais à la rencontre d'une personne</li>
                  <li>Je lui fais un don chez un commerçant via le site</li>
                  <li>La personne consomme ce don quand elle en a envie</li>
                </ol>
              </div>
              <div className="col d-none d-md-flex justify-content-center">
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
                <p>
                  For doing some work for us "pro bono" will really add to your portfolio i promise
                  nor can my website be in english?. In an ideal world give us a complimentary.
                </p>
                <Link exact key="donorRegistration" className="text-accent" to="/register/donor">
                  Nous rejoindre
                </Link>
              </div>

              {/* bloc bénéficiaire */}
              <div className="col text-center d-flex flex-column profile-col">
                <div className="profile-bloc profile-bloc-beneficiary">Bénéficiaire</div>
                <p>
                  For doing some work for us "pro bono" will really add to your portfolio i promise
                  nor can my website be in english?. In an ideal world give us a complimentary.
                </p>
                <Link
                  exact
                  key="beneficiaryRegistration"
                  className="text-accent"
                  to="/register/beneficiary"
                >
                  Nous rejoindre
                </Link>
              </div>

              {/* bloc commerçant */}
              <div className="col text-center d-flex flex-column profile-col">
                <div className="profile-bloc profile-bloc-shopkeeper">Commerçant</div>
                <p>
                  For doing some work for us "pro bono" will really add to your portfolio i promise
                  nor can my website be in english?. In an ideal world give us a complimentary.
                </p>
                <Link
                  exact
                  key="shopkeeperRegistration"
                  className="text-accent"
                  to="/register/shopkeeper"
                >
                  Nous rejoindre
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-light py-5">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <h2>Témoignages</h2>
              </div>
            </div>
            <div className="row">
              {testimonies.map(testimony => (
                <div className="col-sm" key={testimony.avatar_url}>
                  <div className="testimony">
                    <p className="text-small">{testimony.text}</p>
                    <div className="testimony-metas">
                      <img src={testimony.avatar_url} alt={testimony.name} />
                      <span className="name">{testimony.name} - </span>
                      <span className="role">{testimony.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Home;

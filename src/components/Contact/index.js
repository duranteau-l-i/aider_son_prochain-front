import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';
import Header from 'components/Header';
import { serializeFormData } from 'utils';

import contactBackgroundImage from 'assets/img/handshake.jpg';

class Contact extends React.Component {
  componentDidMount() {
    document.title = 'Contact - Aide ton prochain';
  }

  submitContactForm = event => {
    const { submitContact } = this.props;
    event.preventDefault();
    const jsonObject = serializeFormData(event.target);
    submitContact(jsonObject);
  };

  render() {
    return (
      <>
        <Header title="contactez-nous" theme="dark" backgroundImage={contactBackgroundImage} />
        <div className="container mt-4 py-5">
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <h2>Demande de contact</h2>
              <p className="text-small">
                Pour toute demande de renseignements sur notre association, nos activités, nos
                missions ou pour toute autre demande, n'hésitez pas à nous contacter. Vous pouvez
                utiliser le formulaire ci-dessous ou nous envoyer un email. Nous essayerons de vous
                répondre dans les plus brefs délais.
              </p>
              <form className="mb-4" onSubmit={this.submitContactForm}>
                <Input
                  type="email"
                  label="Adresse email"
                  name="email"
                  id="email"
                  placeholder="votre adresse mail"
                  className="form-control"
                  required={true}
                />
                <Input
                  type="text"
                  label="Objet"
                  name="object"
                  id="object"
                  placeholder="objet de la prise de contact"
                  className="form-control"
                  required={false}
                />
                <div className="form-group">
                  <label htmlFor="message">Votre message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    id="message"
                    placeholder="Votre message"
                    aria-label="With textarea"
                    rows="5"
                  />
                </div>

                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="rgpdCheckbox" required />
                  <label className="form-check-label text-small" htmlFor="rgpdCheckbox">
                    En soumettant ce formulaire, j'accepte que les informations soient exploitées
                    dans le cadre de la demande de contact et de la relation qui peut en découler.
                  </label>
                </div>

                <input
                  type="submit"
                  className="btn btn-lg btn-primary mt-3"
                  value="Envoyer"
                  name="submitContact"
                />
              </form>
            </div>
            <div className="col-sm-12 col-md-4">
              <div className="card">
                <div className="card-header">Nos coordonnées</div>
                <div className="card-body">
                  <p className="font-weight-bold mb-0">Aide ton prochain</p>
                  <span>
                    10 Rue de l'exemple
                    <br />
                    75014 - Paris
                  </span>
                  <a href="mailto:contact@aidetonprochain.com" className="d-block mt-3">
                    contact@aider-son-prochain.fr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Contact.propTypes = {
  submitContact: PropTypes.func.isRequired,
};

export default Contact;

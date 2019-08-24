import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from 'components/Header';
import Input from 'components/Input';
import Error403 from 'components/Error403';

import Modal from 'containers/Modal';

const AddProduct = ({ currentUser, submitAddProductForm, role }) => {
  const submitNewProduct = e => {
    e.preventDefault();
    console.log(e.target);
    const data = {};
    Array.from(e.target).forEach(el => {
      if (el.value !== '') {
        data[el.name] = el.value;
      }
    });
    data.price = data.price.replace(',', '.');
    submitAddProductForm(data, currentUser.token);
  };
  if (currentUser.user !== undefined && role === 'shopkeeper') {
    return (
      <>
        <Header title="Ajouter un produit" />

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6 px-lg-5 bg-white py-5">
              <form className="mt-4" onSubmit={submitNewProduct}>
                <Input
                  label="Nom du produit"
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required={true}
                />
                <Input
                  label="Prix"
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  required={true}
                />
                <Input
                  label="Description"
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                />
                <div className="mt-5 text-right">
                  <Link
                    to={`${process.env.PUBLIC_URL}/profil`}
                    path={`${process.env.PUBLIC_URL}/profil`}
                    className="btn btn-outline-secondary"
                  >
                    Retour au profil
                  </Link>
                  <button type="submit" className="btn btn-primary ml-4">
                    Ajouter un produit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Modal
          title="Ajout d'un produit"
          message="Le produit a été ajouté avec succès"
          messageError="Le produit n'a pu être ajouté"
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

AddProduct.propTypes = {
  currentUser: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  submitAddProductForm: PropTypes.func.isRequired,
};

AddProduct.deaultProps = {};

export default AddProduct;

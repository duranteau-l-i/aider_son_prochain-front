import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Modal from 'containers/Modal';

class EditProduct extends React.Component {
  state = {
    product: {},
  };
  componentDidMount() {
    const productId = this.props.match.params.id;
    const shopkeeperId = this.props.currentUser.user._id;
    axios
      .get(`${process.env.REACT_APP_API_URL_DEV}/product/${shopkeeperId}/${productId}`)
      .then(response => {
        this.setState({
          product: response.data.product,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  submitEditProduct = e => {
    e.preventDefault();
    const productId = this.state.product._id;
    const { submitEditProductForm, token } = this.props;
    const data = {};
    Array.from(e.target).forEach(el => {
      if (el.value !== '') {
        data[el.name] = el.value;
      }
    });
    data.price = data.price.replace(',', '.');
    submitEditProductForm(data, productId, token);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      product: { ...state.product, [name]: value },
    }));
  };

  render() {
    const { name, price, description } = this.state.product;
    return (
      <>
        <Header title="Editer un produit" />

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6 px-lg-5 bg-white py-5">
              <h2 className="text-center mb-3">
                Edition du produit : <br />
                <small>{name}</small>
              </h2>
              <form className="mt-4" onSubmit={this.submitEditProduct}>
                <div className="form-group">
                  <label htmlFor={name}>Nom du produit</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    required={false}
                    value={name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={price}>Prix</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    required={true}
                    value={price}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={description}>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="mt-5 text-right">
                  <Link to="/profil" path="/profil" className="btn btn-outline-secondary">
                    Retour au profil
                  </Link>
                  <button type="submit" className="btn btn-primary ml-4">
                    Editer le produit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Modal
          title="Edition du produit"
          message="Le produit a été mis à jour avec succès"
          messageError="Le produit n'a pu être mis à jour"
          page="profil"
        />
      </>
    );
  }
}

EditProduct.propTypes = {
  currentUser: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  submitEditProductForm: PropTypes.func.isRequired,
};

export default withRouter(EditProduct);

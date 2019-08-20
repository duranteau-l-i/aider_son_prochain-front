import React from 'react';
import { serializeFormData } from 'utils';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from 'components/Header';

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

  submitEditProduct = event => {
    event.preventDefault();
    const productId = this.state.product._id;
    const { submitEditProductForm, token } = this.props;
    const newProductObject = serializeFormData(event.target);
    submitEditProductForm(newProductObject, productId, token);
    event.target.reset();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      product: { ...state.product, [name]: value },
    }));
  };

  render() {
    const { name, price, description } = this.state.product;
    const { productEditedConfirmMessage } = this.props;
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
              {productEditedConfirmMessage && (
                <div className={`alert alert-${productEditedConfirmMessage.type}`}>
                  {productEditedConfirmMessage.message}
                  {productEditedConfirmMessage.link && (
                    <a href={productEditedConfirmMessage.link.url} className="alert-link">
                      {' ' + productEditedConfirmMessage.link.label}
                    </a>
                  )}
                </div>
              )}
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
                  <Link to="/profil" exact path="/profil" className="btn btn-outline-secondary">
                    Retour au profil
                  </Link>
                  <button type="submit" className="btn btn-primary ml-4">
                    Editer un produit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

EditProduct.propTypes = {
  currentUser: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  productEditedConfirmMessage: PropTypes.func.isRequired,
};

export default withRouter(EditProduct);

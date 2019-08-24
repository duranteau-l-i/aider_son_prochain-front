import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from 'components/EmptyState';

class Product extends Component {
  componentDidMount() {
    const { getProducts } = this.props;
    const shopkeeperId = this.props.currentUser.user._id;
    getProducts(shopkeeperId);
  }

  clickDeleteProduct = e => {
    e.preventDefault();
    const confirmDelete = window.confirm('Voulez-vous vraiement supprimer ce produit ?');
    if (confirmDelete) {
      const { token, deleteProduct, getProducts } = this.props;
      const productId = e.target.dataset.id;
      deleteProduct(token, productId);
      const shopkeeperId = this.props.currentUser.user._id;
      getProducts(shopkeeperId);
    }
  };

  submitDonation = e => {};

  render() {
    const { products, role } = this.props;

    return (
      <>
        <div className="mb-2 table-header d-flex justify-content-between align-items-center">
          <p className="font-weight-bold">
            Liste des produits disponibles dans votre établissement
          </p>
        </div>
        {products && (
          <table className="table text-left">
            <thead>
              <tr className="text-muted">
                <th scope="col">Produit</th>

                {role !== 'beneficiary' && (
                  <>
                    <th scope="col">Prix</th>
                    <th scope="col">Action</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr className="product-row" key={product._id}>
                  <td>
                    {product.name}
                    {product.description && (
                      <small className="d-block text-muted">{product.description}</small>
                    )}
                  </td>

                  <td>{product.price}€</td>
                  <td className="selector text-center">
                    {role === 'donor' && (
                      <input
                        type="checkbox"
                        value="1"
                        data-id={product._id}
                        data-price={product.price}
                      />
                    )}
                    {role === 'shopkeeper' && (
                      <div className="action-links">
                        <Link to={`/edit-product/${product._id}`}>
                          <button className="btn btn-primary btn-sm">Editer</button>
                        </Link>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={this.clickDeleteProduct}
                          data-id={product._id}
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!products && <EmptyState message="Vous n'avez pas encore ajouté de produit." />}

        <div className="text-center mb-5">
          <Link exact to="/add-product" path="/add-product" className="btn btn-outline-primary">
            Ajouter un produit
          </Link>
        </div>
      </>
    );
  }
}

export default Product;

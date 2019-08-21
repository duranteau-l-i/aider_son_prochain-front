import React from 'react';

import ProductSelector from 'components/Shopkeeper/ProductSelector';
import OpeningHours from 'components/Shopkeeper/OpeningHours';

class Shopkeeper extends React.Component {
  componentDidMount() {
    const { getProducts } = this.props;
    const shopkeeperId = this.props.currentUser.user._id;
    getProducts(shopkeeperId);
  }

  clickDeleteProduct = evt => {
    const confirmDelete = window.confirm('Voulez-vous vraiement supprimer ce produit ?');
    if (confirmDelete) {
      const { token, deleteProduct, getProducts } = this.props;
      const productId = evt.target.dataset.id;
      deleteProduct(token, productId);
      const shopkeeperId = this.props.currentUser.user._id;
      getProducts(shopkeeperId);
    }
  };

  render() {
    const { role, products } = this.props;
    const shop = this.props.currentUser.user;

    return (
      <>
        <div className="profile-group mb-3">
          <p className="mb-1 font-weight-bold">Description</p>
          <>
            {shop.description && shop.description.trim() === '' && 'Aucune description enregistrée'}

            {shop.description && shop.description.trim() !== '' && (
              <>
                {shop.description.split('.').map(d => (
                  <p key={d} className="m-0 text-small">
                    {' '}
                    {d}{' '}
                  </p>
                ))}
              </>
            )}
          </>
        </div>
        <p className="font-weight-bold">Horaires et coordonnées</p>
        {shop && (
          <div className="card">
            <div className="card-body">
              <p className="text-small">
                <span className="font-weight-bold">Adresse : </span>
                <br />
                <span>{shop.location.address}</span>
                <br />
                <a
                  href={`https://maps.google.com/?q=${shop.location.latitude},${
                    shop.location.longitude
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir sur la carte
                </a>
              </p>

              <span className="font-weight-bold text-small d-block mb-2">Horaires : </span>

              <OpeningHours shop={shop} />
            </div>
          </div>
        )}

        {products && shop && (role === 'shopkeeper' || role === 'donor') && (
          <div className="mt-5">
            <ProductSelector
              products={products}
              role={role}
              clickDeleteProduct={this.clickDeleteProduct}
            />
          </div>
        )}
      </>
    );
  }
}

export default Shopkeeper;

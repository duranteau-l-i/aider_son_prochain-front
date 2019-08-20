import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from 'components/EmptyState';

class ProductSelector extends React.Component {
  render() {
    const {
      products,
      role,
      total,
      clickDeleteProduct,
      changeDonationTotal,
      inputSearchBeneficiary,
      beneficiariesSuggests,
      clickSuggest,
      submitDonation,
    } = this.props;

    return (
      <>
        <div className="mb-2 table-header d-flex justify-content-between align-items-center">
          <p className="font-weight-bold">
            {role === 'donor' && products.length > 0 && (
              <>1 - Sélectionnez les produits que vous désirez offrir</>
            )}
            {role === 'shopkeeper' && <>Liste des produits disponibles dans votre établissement</>}
          </p>
        </div>
        {products.length > 0 ? (
          <form
            className="mt-2 mb-4 form-inline"
            onSubmit={submitDonation}
            onInput={changeDonationTotal}
            autoComplete="off"
          >
            <table className="table text-left">
              <thead>
                <tr className="text-muted">
                  <th scope="col">Produit</th>

                  {role !== 'beneficiary' && (
                    <>
                      <th scope="col">Prix</th>
                      <th scope="col">
                        {role === 'donor'
                          ? 'Sélection'
                          : role === 'shopkeeper'
                          ? 'Action'
                          : 'Quantité'}
                      </th>
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
                        <small class="d-block text-muted">{product.description}</small>
                      )}
                    </td>
                    {role !== 'beneficiary' && (
                      <>
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
                              <Link to={`/edit-product/${product._id}`}>Editer</Link>
                              <span
                                className="text-primary"
                                onClick={clickDeleteProduct}
                                data-id={product._id}
                              >
                                Supprimer
                              </span>
                            </div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
              {role === 'donor' && (
                <tfoot>
                  <tr>
                    <th scope="row">Total</th>
                    <td>{total}€</td>
                    <td />
                  </tr>
                </tfoot>
              )}
            </table>

            {role === 'donor' && (
              <>
                <p className="font-weight-bold">2 - Affectez votre don à un bénéficiaire</p>
                <div className="d-flex mt-2 align-items-start" style={{ width: '100%' }}>
                  <div className="d-flex flex-column">
                    <div className="form-group">
                      <label htmlFor="beneficiary-search-input">Bénéficiaire : </label>
                      <div className="suggests-container">
                        <input
                          type="text"
                          className="form-control mx-2"
                          id="beneficiary-search-input"
                          name="beneficiary"
                          placeholder="ex : Jane Doe"
                          aria-describedby="beneficiaryHelp"
                          onChange={inputSearchBeneficiary}
                        />
                        <div className="suggests d-none">
                          {beneficiariesSuggests.map(suggest => {
                            return (
                              <div
                                className="suggest"
                                key={suggest._id}
                                onClick={clickSuggest}
                                data-id={suggest._id}
                              >
                                {suggest.username}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <small id="beneficiaryHelp" className="form-text text-muted">
                      Entrez le nom d'utilisateur ou un nom libre.
                    </small>
                  </div>

                  <input
                    type="submit"
                    className="btn btn-custom-accent ml-auto btn-lg"
                    name="submitProductSelector"
                    value="Valider la donation"
                    disabled={!this.props.isDonationReady}
                  />
                </div>
              </>
            )}
          </form>
        ) : role === 'shopkeeper' ? (
          <EmptyState message="Vous n'avez pas encore ajouté de produit." />
        ) : (
          (role === 'donor' || role === 'beneficiary') && (
            <EmptyState
              message="Cet établissement n'a aucun produit disponible pour le moment"
              link={{ label: 'Retour à la liste', url: '/shopkeeper' }}
              className="mb-5"
            />
          )
        )}
        {role === 'shopkeeper' && (
          <div className="text-center mb-5">
            <Link exact to="/add-product" path="/add-product" className="btn btn-outline-primary">
              Ajouter un produit
            </Link>
          </div>
        )}
      </>
    );
  }
}

export default ProductSelector;

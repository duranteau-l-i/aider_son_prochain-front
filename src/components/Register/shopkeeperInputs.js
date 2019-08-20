import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

import Input from 'components/Input';

const RegisterShopkeeper = ({ value, onChange, onSelect }) => (
  <>
    <h3 className="topSectionH3 mt-5">Votre commerce</h3>
    <Input
      type="text"
      label="Nom de votre commerce"
      name="shopkeeper_name"
      id="shopkeeper_name"
      placeholder="ex: Café de la gare"
      required={true}
    />

    <div className="form-group">
      <label htmlFor="">Adresse de votre commerce</label>
      <PlacesAutocomplete value={value} onChange={onChange} onSelect={onSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Entrez une adresse',
                className: 'location-search-input form-control',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>

    <div className="form-group">
      <p>Catégories de l'établissement</p>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Restauration"
          id="restauration"
          name="categories"
        />
        <label className="form-check-label" htmlFor="restauration">
          Restauration
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="categories"
          value="Habillement"
          id="habillement"
        />
        <label className="form-check-label" htmlFor="habillement">
          Habillement
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="categories"
          value="Hôtellerie"
          id="hotellerie"
        />
        <label className="form-check-label" htmlFor="hotellerie">
          Hôtellerie
        </label>
      </div>
    </div>
  </>
);

export default RegisterShopkeeper;

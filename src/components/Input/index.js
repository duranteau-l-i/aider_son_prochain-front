import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type,
  label,
  name,
  id,
  placeholder,
  required,
  value,
  disabled,
  fieldHelp,
  className = '',
  parentClassName = '',
  onChange,
  minLength,
  pattern,
}) => (
  <div className={'form-group ' + (parentClassName ? parentClassName : '')}>
    <label htmlFor={id}>
      {label}
      {required === true ? <span className="required"> *</span> : null}
    </label>
    {required && (
      <input
        type={type}
        className={'form-control ' + (className ? className : '')}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
        minLength={minLength}
        pattern={pattern}
      />
    )}
    {!required && (
      <input
        type={type}
        className={'form-control ' + (className ? className : '')}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        minLength={minLength}
        pattern={pattern}
      />
    )}
    {fieldHelp && (
      <small id={`${id}-emailHelp`} className="form-text text-muted">
        {fieldHelp}
      </small>
    )}
  </div>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;

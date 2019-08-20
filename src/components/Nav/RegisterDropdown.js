import React from 'react';
import { Link } from 'react-router-dom';

const RegisterDropdown = () => {
  return (
    <>
      <li className="nav-item dropdown">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Inscription
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link exact to="/register/beneficiary" className="nav-link">
            Bénéficiaire
          </Link>
          <Link exact to="/register/donor" className="nav-link">
            Donateur
          </Link>
          <Link exact to="/register/shopkeeper" className="nav-link">
            Commerçant
          </Link>
        </div>
      </li>
    </>
  );
};

export default RegisterDropdown;

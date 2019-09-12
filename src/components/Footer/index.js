import React from 'react';

import './footer.scss';

const Footer = () => {
  return (
    <>
      <footer id="sticky-footer" className="py-4 bg-dark text-white-50 mt-5">
        <div className="container text-center">
          <small>Copyright &copy; 2019 | {process.env.REACT_APP_WEBSITE_TITLE}</small>
        </div>
      </footer>
    </>
  );
};

export default Footer;

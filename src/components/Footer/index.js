import React, { useEffect } from 'react';

import './footer.scss';

const Footer = () => {
  // useEffect(() => {
  //   const unload = window.addEventListener('beforeunload', e => {
  //     // e.preventDefault();
  //     localStorage.clear();
  //   });

  //   return function cleanup() {
  //     window.removeEventListener('beforeunload', unload);
  //   };
  // });

  return (
    <>
      <footer id="sticky-footer" className="py-4 bg-dark text-white-50 mt-5">
        <div className="container text-center">
          <small>Copyright &copy; 2019 | Aider son prochain</small>
        </div>
      </footer>
    </>
  );
};

export default Footer;

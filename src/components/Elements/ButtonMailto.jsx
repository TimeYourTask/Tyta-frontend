import React from 'react';
import { Link } from 'react-router-dom';

const ButtonMailto = ({ email, children }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <Link
    to="#"
    onClick={(e) => {
      window.open(`mailto:${email}`, '_blank');
      e.preventDefault();
    }}
  >
    {children}
  </Link>
);

export default ButtonMailto;

import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

const ButtonLink = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

export default ButtonLink;

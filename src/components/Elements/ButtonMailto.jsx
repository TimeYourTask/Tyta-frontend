import React from 'react';

import { Box } from '@mui/material';

const ButtonMailto = ({ email, children }) => (
  <Box
    component="a"
    href={`mailto:${email}`}
    sx={{ cursor: 'pointer' }}
    onClick={(e) => {
      window.open(`mailto:${email}`, '_blank');
      e.preventDefault();
    }}
  >
    {children}
  </Box>
);

export default ButtonMailto;

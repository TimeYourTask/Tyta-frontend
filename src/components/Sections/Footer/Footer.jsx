import './Footer.scss';

import React from 'react';

import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import ButtonMailto from '../../Elements/ButtonMailto';

const Footer = () => (
  <Paper
    sx={{
      width: '100%',
      display: 'flex',
      gap: 2,
      justifyContent: { xs: 'center', sm: 'space-between' },
      boxSizing: 'border-box',
      position: 'fixed',
      flexWrap: 'wrap',
      bottom: 0,
      py: 1,
      px: 4,
    }}
    component="footer"
    square
    variant="outlined"
  >
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography variant="caption" color="grey.500">
        <Link to="/">TimeYourTask © 2022</Link>
      </Typography>
    </Box>
    <Typography
      variant="overline"
      color="grey.500"
      sx={{
        justifyContent: { xs: 'center', sm: 'right' },
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
      }}
    >
      <ButtonMailto email="contact@timeyourtask.com">Contact us</ButtonMailto>
      <Link to="/">Terms and policies</Link>
      <Link to="/">Sitemap</Link>
    </Typography>
  </Paper>
);

export default Footer;

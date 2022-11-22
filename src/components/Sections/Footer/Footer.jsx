import './Footer.scss';

import React from 'react';

import { Paper, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const Footer = () => (
  <Paper
    sx={{
      marginTop: 'calc(10% + 60px)',
      position: 'fixed',
      bottom: 0,
      width: '100%',
    }}
    component="footer"
    square
    variant="outlined"
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          display: 'flex',
          my: 1,
        }}
      >
        <div>
          <Typography variant="caption" color="initial">
            <Link to="/">TimeYourTask © 2022</Link>
          </Typography>
        </div>
      </Box>
    </Container>
  </Paper>
);

export default Footer;

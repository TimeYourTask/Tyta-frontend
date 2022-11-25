import './NotFound.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import NotFoundImg from '../../assets/not-found.svg';

const NotFound = () => (
  <Container
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      my: 10,
    }}
  >
    <Box
      component="img"
      sx={{
        width: '60%',
      }}
      alt="The house from the offer."
      src={NotFoundImg}
    />
    <Box>
      <Typography variant="h3">Oups...</Typography>
      <Typography variant="h5">Page not foud</Typography>
      <Typography variant="body1" sx={{ my: 2, mb: 5 }}>
        It seems that this page does not exist or no longer exists
      </Typography>
      <Button variant="contained" startIcon={<ArrowBackIcon />}>
        <Link to="/">Back to home</Link>
      </Button>
    </Box>
  </Container>
);

export default NotFound;

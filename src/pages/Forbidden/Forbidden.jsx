import './Forbidden.scss';

import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ForbiddenImg from '../../assets/forbidden.svg';

const Forbidden = () => (
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
        width: '50%',
      }}
      alt="Lock page."
      src={ForbiddenImg}
    />
    <Box>
      <Typography variant="h3">Oups...</Typography>
      <Typography variant="h5">Not authorized</Typography>
      <Typography variant="body1" sx={{ my: 2, mb: 5 }}>
        You need to be connected, or you don't have access to this page
      </Typography>
      <Button variant="contained" startIcon={<ArrowBackIcon />} href="/">
        Back to home
      </Button>
    </Box>
  </Container>
);

export default Forbidden;

import './Login.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  FormControl,
  Grid,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Box,
  Typography,
  InputAdornment,
  InputLabel,
  IconButton,
  OutlinedInput,
  Link,
} from '@mui/material';
import {
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

import LoginImg from '../../assets/login.webp';
import { login } from '../../store/actions';

const Login = () => {
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/overview');
    }
  });

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const showPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const isValid = () => {
    if (!values.email || !values.password) {
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (!isValid) return;

    dispatch(login(values.email, values.password)).then(() => {
      navigate('/overview');
    });

    // TODO: Send an alert to the user to say Welcome!
  };

  return (
    <Grid container spacing={5} alignItems="center">
      <Grid item xs={12} md={7}>
        <Typography variant="h2" sx={{ marginTop: 6, marginBottom: 4 }}>
          Welcome back! 👋
        </Typography>
        <Box component="form" onSubmit={() => handleSubmitForm} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <TextField
                  type="email"
                  placeholder="welcome@email.com"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange('email')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password"
                  type={values.showPassword ? 'text' : 'password'}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={showPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Typography sx={{ marginTop: 1 }}>
                Forgot your password?{' '}
                <Link
                  href="/"
                  variant="body"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/reset-password');
                  }}
                >
                  We'll help you find it
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox required />}
                label="Stay logged in"
                name="keep-signed"
                onChange={handleChange('keepSigned')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                disabled={!isValid()}
                disableRipple
                onClick={handleSubmitForm}
              >
                Join now!
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={5} sx={{ overflow: 'hidden', display: { xs: 'none', md: 'block' } }}>
        <Box
          component="img"
          alt="Night landscape"
          src={LoginImg}
          sx={{
            width: 'auto',
            height: '100%',
            maxHeight: '800px',
            textAlign: 'center',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Login;

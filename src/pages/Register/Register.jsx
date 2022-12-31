import './Register.scss';

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
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

import RegisterImg from '../../assets/register.webp';
import { register } from '../../store/actions';

const Register = () => {
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
      [name]: name === 'cgu' ? event.target.checked : event.target.value,
    });
  };

  const showPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    dispatch(register(values.email, values.password)).then(() => {
      navigate('/overview');
    });
    // TODO: Send an alert for register
  };

  const isValid = () => {
    if (
      values.email === '' ||
      values.repeatPassword === '' ||
      values.password === '' ||
      !values.cgu
    ) {
      return false;
    }
    return true;
  };

  return (
    <Grid container spacing={5} alignItems="center" justifyContent="center">
      <Grid item xs={5} sx={{ overflow: 'hidden', display: { xs: 'none', md: 'block' } }}>
        <Box
          component="img"
          alt="Night landscape"
          src={RegisterImg}
          sx={{
            width: 'auto',
            height: '100%',
            maxHeight: '800px',
            textAlign: 'center',
          }}
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <Box className="text-intro" sx={{ marginBottom: 4 }}>
          <Typography variant="h2" sx={{ marginBottom: 2 }}>
            Welcome! 👋
          </Typography>
          <Alert severity="info">
            <AlertTitle>Why create an account?</AlertTitle>
            <ul className="advantages">
              <li>Create/Join a work team</li>
              <li>Create your next project and track tasks</li>
              <li>Be Happy</li>
            </ul>
          </Alert>
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          onSubmit={() => handleSubmitForm}
          noValidate
        >
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
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="repeat-password">Repeat your password</InputLabel>
                <OutlinedInput
                  id="repeat-password"
                  label="Repeat your password"
                  type={values.showPassword ? 'text' : 'password'}
                  onChange={handleChange('repeatPassword')}
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
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox required />}
                label="I agree with the terms of use of TimeYourTasks"
                name="cgu"
                onChange={handleChange('cgu')}
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
                Create an account now!
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;

import './ResetPassword.scss';

import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import {
  FormControl,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  InputLabel,
  IconButton,
  OutlinedInput,
} from '@mui/material';
import {
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { sendEmailToResetPassword, resetPassword } from '../../api/user.api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [values, setValues] = React.useState({
    showPassword: false,
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

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const token = searchParams.get('token');
    const userId = searchParams.get('id');

    if (!token || !token) {
      const sendEmail = await sendEmailToResetPassword(values.email);
      console.log(sendEmail);
      // TODO: send alert to global app before redirection to say to user "Check your email"
      navigate('/');
    } else {
      const resetPasswordReq = await resetPassword(
        userId,
        token,
        values.password
      );
      console.log(resetPasswordReq);
      // TODO: send alert to global app before redirection to say to user
      // TODO: "Password reset successfully please login"
      navigate('/login');
    }
  };

  const isValid = () => {
    if (
      (!values.email && !searchParams.get('token')) ||
      ((!values.password || !values.repeatPassword) &&
        searchParams.get('token'))
    ) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Typography variant="h3" sx={{ marginTop: 6, marginBottom: 4 }}>
        You forgot your password? 😬
      </Typography>
      <Box component="form" onSubmit={() => handleSubmitForm} noValidate>
        <Grid container spacing={2}>
          {!searchParams.get('token') ? (
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
          ) : (
            <>
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
                          {values.showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password">
                    Repeat your password
                  </InputLabel>
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
                          {values.showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Button
              size="large"
              type="submit"
              variant="contained"
              disabled={!isValid()}
              disableRipple
              onClick={handleSubmitForm}
            >
              Send me an email!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ResetPassword;

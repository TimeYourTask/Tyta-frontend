import './CreateProject.scss';

import React from 'react';
import { useSelector } from 'react-redux';

import { FormControl, Grid, TextField, Button, Box, Typography } from '@mui/material';

const CreateProject = () => {
  const [values, setValues] = React.useState({});
  const { user: currentUser } = useSelector((state) => state.auth);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const isValid = () => {
    if (values.name === '') {
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (!isValid()) return false;

    // TODO: Link With backend
    console.log(values, currentUser, event);
    return true;
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create new project
      </Typography>
      <Box component="form" onSubmit={() => handleSubmitForm} noValidate>
        <Grid container spacing={2} display="flex" flexDirection="column">
          <Grid item>
            <FormControl required fullWidth>
              <TextField
                type="text"
                placeholder="Name of the project"
                label="Name"
                variant="outlined"
                onChange={handleChange('name')}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl required fullWidth>
              <TextField
                type="text"
                placeholder="My little project description"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                onChange={handleChange('description')}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              size="large"
              type="submit"
              variant="contained"
              disabled={!isValid()}
              disableRipple
              onClick={handleSubmitForm}
            >
              Create project!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateProject;

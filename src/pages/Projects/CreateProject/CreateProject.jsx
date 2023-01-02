import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { FormControl, Grid, TextField, Button, Box, Typography } from '@mui/material';

import ProjectService from '../../../store/services/projects.service';
import { SET_NOTIFICATION } from '../../../store/actions';

const CreateProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teamID } = useParams();

  const [values, setValues] = React.useState({});

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

    ProjectService.createProject(teamID, values).then(() => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message: `Project "${values.name}" successfully created!`,
          type: 'success',
        },
      });
      navigate(-1);
    });

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
              type="submit"
              variant="contained"
              disabled={!isValid()}
              disableRipple
              onClick={handleSubmitForm}
              sx={{
                marginRight: 1,
              }}
            >
              Create project!
            </Button>
            <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateProject;

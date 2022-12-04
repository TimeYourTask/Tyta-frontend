import './CreateProject.scss';

import React from 'react';
import {
  FormControl,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  AlertTitle,
  MenuItem,
  Select,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard'];

const CreateProject = () => {
  const [users, setUsers] = React.useState([]);
  const [values, setValues] = React.useState({});

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const selectChange = (event) => {
    const {
      target: { value },
    } = event;
    setUsers(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    // TODO: Link With backend
    console.log(values, users, event);
  };

  const isValid = () => {
    if (values.name === '' || values.description === '' || users === '') {
      return false;
    }
    return true;
  };

  return (
    <Grid container spacing={5} alignItems="center" justifyContent="center">
      <Grid item xs={12} md={7}>
        <Box className="text-intro" sx={{ marginBottom: 4 }}>
          <Typography variant="h2" sx={{ marginBottom: 2 }}>
            Create Project !
          </Typography>
          <Alert severity="info">
            <AlertTitle>How to create a Project?</AlertTitle>
            <ul className="howtocreate">
              <li>Give a name to your project.</li>
              <li>
                Write a short description of the project so that you know what
                it is about.
              </li>
              <li>Assign this project to the right team</li>
              <li>Assign this project to the appropriate contributors</li>
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
                  type="text"
                  placeholder="Name of the project"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange('name')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <TextField
                  type="text"
                  placeholder="Description of the project"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  onChange={handleChange('description')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Users</InputLabel>
                <Select
                  multiple
                  value={users}
                  onChange={selectChange}
                  input={<OutlinedInput label="Users" />}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                Create project!
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateProject;

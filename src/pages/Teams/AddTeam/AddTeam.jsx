import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, FormControl, TextField, Typography, Grid } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import { createTeam, SET_NOTIFICATION } from '../../../store/actions';

const AddTeam = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addTeam = () => {
    if (name.trim().length > 0) {
      dispatch(createTeam(name));
    } else {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message: 'Incorrect team name !',
          type: 'error',
        },
      });
    }
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="add-team">
      <Typography variant="h4" component="h4">
        Create a new team
      </Typography>
      <FormControl
        fullWidth
        sx={{
          margin: '20px 0',
        }}
      >
        <TextField id="team-name" label="Name" value={name} onChange={handleName} />

        <Grid
          container
          sx={{
            margin: '20px 0',
          }}
        >
          <Grid item xs={12} sm={2}>
            <Button onClick={addTeam} startIcon={<GroupAddIcon />} variant="contained">
              Create Team
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  );
};

export default AddTeam;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { createTeam } from '../../../store/actions/teams';
import { SET_NOTIFICATION } from '../../../store/actions/types';

const AddTeam = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

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
        <Button
          sx={{
            margin: '20px 0',
          }}
          onClick={addTeam}
          startIcon={<GroupAddIcon />}
        >
          Create Team
        </Button>
      </FormControl>
    </div>
  );
};

export default AddTeam;

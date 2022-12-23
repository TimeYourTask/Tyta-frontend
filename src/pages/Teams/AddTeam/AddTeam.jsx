import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { createTeam } from '../../../store/actions/teams';

const AddTeam = () => {
  const [name, setName] = useState(null);
  const dispatch = useDispatch();

  const addTeam = () => {
    if (name.trim().length > 0) {
      dispatch(createTeam(name));
    }
  };

  return (
    <div className="add-team">
      <Typography variant="h5" component="h5">
        Create a new team
      </Typography>
      <FormControl
        fullWidth
        sx={{
          margin: '20px 0',
        }}
      >
        <Button
          sx={{
            margin: '20px 0',
          }}
          onClick={addTeam}
        >
          <GroupAddIcon />
          Create Team
        </Button>
      </FormControl>
    </div>
  );
};

export default AddTeam;

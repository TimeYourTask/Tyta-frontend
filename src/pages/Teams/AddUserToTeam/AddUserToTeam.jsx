import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { getUsers } from '../../../store/actions/users';
import { addUserToTeam, getTeams } from '../../../store/actions/teams';

const AddUserToTeam = () => {
  const { teamID } = useParams();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);
  const { teams } = useSelector((state) => state.teams);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectableUsers, setSelectableUsers] = useState([]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (teams.length) {
      const tempUsers = JSON.parse(JSON.stringify(users));
      const team = teams.find((t) => t._id === teamID);

      const alreadySelectedUsers = team.users.map((u) => u.user._id);

      const filteredUsers = tempUsers.filter(
        (user) => !alreadySelectedUsers.includes(user._id)
      );

      setSelectableUsers(filteredUsers);
      setSelectedTeam(team);
    } else {
      dispatch(getTeams());
    }
  }, [teams, users, dispatch, teamID]);

  const handleChange = (event) => {
    setSelectedUsers(event.target.value);
  };

  const getStyles = (name) => ({
    fontWeight: selectedUsers.indexOf(name) === -1 ? 500 : 800,
  });

  const addUsers = async () => {
    await selectedUsers.forEach((user) => {
      dispatch(addUserToTeam(teamID, user._id));
    });

    setSelectedUsers([]);
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div className="add-user-to-team">
      <Typography variant="h5" component="h5">
        Add User To Team {selectedTeam && selectedTeam.name}
      </Typography>
      <FormControl
        fullWidth
        sx={{
          margin: '20px 0',
        }}
      >
        <InputLabel id="select-label">Users</InputLabel>
        <Select
          labelId="select-label"
          id="select-users"
          multiple
          value={selectedUsers}
          onChange={(event) => handleChange(event)}
          input={<OutlinedInput label="Name" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.lastName} label={capitalize(value.firstName)} />
              ))}
            </Box>
          )}
        >
          {selectableUsers.map((user) => (
            <MenuItem key={user._id} value={user} style={getStyles(user)}>
              {capitalize(user.firstName)}
            </MenuItem>
          ))}
        </Select>

        <Button
          sx={{
            margin: '20px 0',
          }}
          onClick={addUsers}
        >
          <GroupAddIcon />
          Add User{selectedUsers.length > 1 ? 's' : ''}
        </Button>
      </FormControl>
    </div>
  );
};

export default AddUserToTeam;

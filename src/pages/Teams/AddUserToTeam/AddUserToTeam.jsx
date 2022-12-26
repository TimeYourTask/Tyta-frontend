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
import { addUserToTeam } from '../../../store/actions/teams';
import UsersService from '../../../store/services/users.service';
import TeamsService from '../../../store/services/teams.service';

const AddUserToTeam = () => {
  const { teamID } = useParams();
  const dispatch = useDispatch();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectableUsers, setSelectableUsers] = useState([]);

  let users = [];
  let team = {};

  const data = async () => {
    users = await UsersService.getUsers();
    team = await TeamsService.getOneTeam(teamID);

    if (users && team) {
      const tempUsers = JSON.parse(JSON.stringify(users));

      const alreadySelectedUsers = team.users.map((u) => u.user._id);

      const filteredUsers = tempUsers.filter((user) => !alreadySelectedUsers.includes(user._id));

      setSelectableUsers(filteredUsers);
      setSelectedTeam(team);
    }
  };

  useEffect(() => {
    data();
  }, []);

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
      <Typography variant="h4" component="h4">
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
          {selectableUsers.length === 0 && (
            <MenuItem disabled selected>
              No users available
            </MenuItem>
          )}
        </Select>

        <Button
          sx={{
            margin: '20px 0',
          }}
          onClick={addUsers}
          startIcon={<GroupAddIcon />}
        >
          <GroupAddIcon />
          Add User{selectedUsers.length > 1 ? 's' : ''}
        </Button>
      </FormControl>
    </div>
  );
};

export default AddUserToTeam;

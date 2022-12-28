import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, FormControl, Typography, Autocomplete, TextField } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import UsersService from '../../../store/services/users.service';
import ProjectsService from '../../../store/services/projects.service';
import { SET_NOTIFICATION } from '../../../store/actions/types';

const AddUserToProject = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectableUsers, setSelectableUsers] = useState([]);

  let users = [];
  let project = {};

  const data = async () => {
    users = await UsersService.getUsers();
    project = await ProjectsService.getOneProject(projectId);

    if (users && project) {
      const tempUsers = JSON.parse(JSON.stringify(users));

      const alreadySelectedUsers = project.users.map((u) => u.user._id);

      const filteredUsers = tempUsers.filter((user) => !alreadySelectedUsers.includes(user._id));

      setSelectableUsers(filteredUsers);
      setSelectedProject(project);
    }
  };

  useEffect(() => {
    data();
  }, []);

  const handleChange = (_, value, reason) => {
    if (reason === 'removeOption') {
      const filtered = selectedUsers.filter((user) =>
        value.some((option) => option.id === user.id)
      );
      return setSelectedUsers(filtered);
    }
    if (reason === 'clear') {
      return setSelectedUsers([]);
    }
    return setSelectedUsers(value);
  };

  const addUsers = async () => {
    if (selectedUsers.length === 0) {
      return;
    }

    await selectedUsers.forEach((user) => {
      ProjectsService.addUserToProject(projectId, user.id);
    });

    dispatch({
      type: SET_NOTIFICATION,
      payload: {
        message: `${selectedUsers.length} users have been successfully added!`,
        type: 'success',
      },
    });

    setSelectedUsers([]);
    navigate(-1);
  };

  return (
    <>
      <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
        Add user in {selectedProject && selectedProject.name} project
      </Typography>
      <FormControl
        fullWidth
        sx={{
          margin: '20px 0',
        }}
      >
        <Autocomplete
          multiple
          autoHighlight
          options={selectableUsers.map((user) => ({ id: user._id, label: user.firstName }))}
          filterOptions={(options, value) =>
            options.filter((opt) => {
              const isSelected = selectedUsers.filter((user) => opt.id === user.id);
              return (
                isSelected.length === 0 &&
                opt.label.toLowerCase().includes(value.inputValue.toLowerCase())
              );
            })
          }
          fullWidth
          onChange={handleChange}
          renderInput={(params) => <TextField label="Select users" {...params} />}
          value={selectedUsers}
          isOptionEqualToValue={(option, value) => option.label === value.label}
        />
      </FormControl>
      <Button
        variant="contained"
        disableRipple
        onClick={addUsers}
        startIcon={<GroupAddIcon />}
        sx={{
          mr: 2,
        }}
      >
        Add {selectedUsers.length > 0 && selectedUsers.length} User
        {selectedUsers.length > 1 && 's'}
      </Button>
      <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
        Cancel
      </Button>
    </>
  );
};

export default AddUserToProject;

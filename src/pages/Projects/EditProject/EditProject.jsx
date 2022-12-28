import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import {
  GroupAdd as GroupAddIcon,
  Clear as ClearIcon,
  Replay as ReplayIcon,
} from '@mui/icons-material';

import { SET_NOTIFICATION } from '../../../store/actions/types';
import ProjectsService from '../../../store/services/projects.service';

const EditProject = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const data = async () => {
    await ProjectsService.getOneProject(projectId).then((projects) => {
      setIsLoading(false);
      setProject(projects);
      setUsers(projects.users);
    });
  };

  useEffect(() => {
    data();
  }, []);

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  const updateProject = async () => {
    if (project.name.trim().length > 0) {
      const payload = project;
      const newUsers = users.filter((user) => !user.deleted);
      payload.users = newUsers;

      await ProjectsService.updateProject(projectId, payload);
      navigate(-1);
    } else {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message: 'Please set a project name!',
          type: 'error',
        },
      });
    }
  };

  const handleChange = (e, field) => {
    setProject({ ...project, [field]: e.target.value });
  };

  const deleteUser = (userID) => {
    setUsers(
      users.map((user) => {
        if (userID === user._id) {
          // eslint-disable-next-line no-param-reassign
          user.deleted = !user.deleted;
        }
        return user;
      })
    );
  };

  const changeRole = (event) => {
    const { value, name } = event.target;
    setUsers(
      users.map((user) => {
        if (name === user._id) {
          // eslint-disable-next-line no-param-reassign
          user.role = value;
        }
        return user;
      })
    );
  };

  return (
    !isLoading && (
      <>
        <Typography variant="h4" component="h4" mb={4}>
          Update the team : {project.name}
        </Typography>
        <FormControl fullWidth>
          <TextField
            label="Name"
            value={project.name}
            onChange={(e) => handleChange(e, 'name')}
            sx={{
              mb: 3,
            }}
          />
          <TextField
            label="Description"
            value={project.description}
            multiline
            rows={4}
            onChange={(e) => handleChange(e, 'description')}
            sx={{
              mb: 3,
            }}
          />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user._id}
                    sx={{
                      background: user.deleted ? 'lightgray' : '',
                    }}
                  >
                    <TableCell>{capitalize(user.user.firstName)}</TableCell>
                    <TableCell>{capitalize(user.user.lastName)}</TableCell>
                    <TableCell>
                      <FormControl size="small">
                        <Select id="role" value={user.role} onChange={changeRole} name={user._id}>
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell size="small" align="right">
                      <IconButton onClick={() => deleteUser(user._id)} color="primary">
                        {user.deleted ? <ReplayIcon /> : <ClearIcon color="error" />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{
              margin: '20px 0',
            }}
          >
            <Grid item xs={12} sm={2}>
              <Button onClick={updateProject} startIcon={<GroupAddIcon />}>
                Update project
              </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button onClick={() => navigate(-1)} color="error">
                Cancel edits
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </>
    )
  );
};

export default EditProject;

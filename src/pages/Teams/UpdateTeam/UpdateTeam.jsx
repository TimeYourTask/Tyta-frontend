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
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ClearIcon from '@mui/icons-material/Clear';
import ReplayIcon from '@mui/icons-material/Replay';

import { capitalize } from '../../../helpers/utils';
import { updateTeam, SET_NOTIFICATION } from '../../../store/actions';
import TeamsService from '../../../store/services/teams.service';

const AddTeam = () => {
  const { teamID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [teamName, setTeamName] = useState('');
  const [users, setUsers] = useState([]);
  const [team, setTeam] = useState({});

  const data = async () => {
    const tempTeam = await TeamsService.getOneTeam(teamID);
    if (tempTeam) {
      setTeam(tempTeam);
      setUsers(tempTeam.users);
      setTeamName(tempTeam.name);
    }
  };

  useEffect(() => {
    data();
  }, []);

  const update = () => {
    if (teamName.trim().length > 0) {
      const tempUsers = users.filter((user) => !user.deleted);
      dispatch(
        updateTeam({
          id: teamID,
          name: teamName,
          users: tempUsers,
        })
      );
      navigate(-1);
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
    setTeamName(event.target.value);
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
    <div className="add-team">
      <Typography variant="h4" component="h4">
        Update the team : {team.name}
      </Typography>
      <FormControl
        fullWidth
        sx={{
          margin: '20px 0',
        }}
      >
        <TextField id="team-name" label="Name" value={teamName} onChange={handleName} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
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
                  {user.user.firstName || user.user.lastname ? (
                    <TableCell>
                      {user.user.firstName && capitalize(user.user.firstName)}{' '}
                      {user.user.lastName && capitalize(user.user.lastName)}
                    </TableCell>
                  ) : (
                    <TableCell>Not specified</TableCell>
                  )}
                  <TableCell>{user.user.email}</TableCell>
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
            <Button onClick={update} startIcon={<GroupAddIcon />}>
              Update the team
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button onClick={() => navigate(-1)} color="error">
              Cancel edits
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  );
};

export default AddTeam;

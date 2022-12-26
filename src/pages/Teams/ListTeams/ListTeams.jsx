import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  IconButton,
} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getTeams } from '../../../store/actions/teams';

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const ListTeams = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  useEffect(() => {
    if (!teams.length) {
      dispatch(getTeams());
    }
  }, [dispatch, teams]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Typography variant="h4" component="h4">
          List of Teams
        </Typography>
        <Button variant="outlined" href="/teams/add" startIcon={<GroupAddIcon />}>
          Create new team
        </Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Projects</TableCell>
              <TableCell align="center">Users</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team._id}>
                <TableCell>
                  <Link to={`/team/${team._id}/projects`}>{team.name}</Link>
                </TableCell>
                <TableCell align="center">{team.projects.length}</TableCell>
                {team.users.length && (
                  <Tooltip
                    placement="right"
                    title={
                      <div>
                        {team.users.map((user) => (
                          <div key={user._id}>
                            {capitalize(user.user.firstName)}
                            {user.role === 'admin' ? ' (Admin)' : ''}
                          </div>
                        ))}
                      </div>
                    }
                  >
                    <TableCell align="center">{team.users.length}</TableCell>
                  </Tooltip>
                )}
                <TableCell size="small" align="right">
                  <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                    <IconButton href={`/team/${team._id}/users`} color="primary">
                      <PersonAddIcon />
                    </IconButton>
                    <IconButton color="warning" href={`/team/${team._id}/update`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListTeams;

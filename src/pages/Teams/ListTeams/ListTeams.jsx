import React, { useEffect } from 'react';
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
} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../../../store/actions/teams';

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const ListTeams = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teams } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Typography variant="h3" component="h3">
          List of Teams
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            navigate('/teams/add');
          }}
        >
          <GroupAddIcon
            sx={{
              padding: '0 10px 0 0',
            }}
          />
          Add a team
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
                <TableCell>{team.name}</TableCell>
                <TableCell align="center">{team.projects.length}</TableCell>
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
                <TableCell size="small" align="right">
                  <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        navigate(`/teams/user/${team._id}`);
                      }}
                    >
                      <PersonAddIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => {
                        navigate(`/teams/user/${team._id}`);
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        navigate(`/teams/user/${team._id}`);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
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

import React, { useEffect, useState } from 'react';
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
  Grid,
  Box,
} from '@mui/material';
import {
  GroupAdd as GroupAddIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AddCircle as AddCircleIcon,
} from '@mui/icons-material';

import ProjectEmptyStateImg from '../../../assets/project-empty-state.svg';

import { capitalize } from '../../../helpers/utils';
import TeamsService from '../../../store/services/teams.service';

const TeamEmptyState = () => (
  <Grid
    container
    spacing={2}
    display="flex"
    flexDirection="column"
    alignItems="center"
    sx={{ mt: 5 }}
  >
    <Grid item xs={8}>
      <Box
        component="img"
        sx={{
          height: '300px',
        }}
        alt="The house from the offer."
        src={ProjectEmptyStateImg}
      />
    </Grid>
    <Grid item xs={4}>
      <Box
        sx={{
          mt: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5">
          <strong>No teams yet!</strong>
        </Typography>
        <Typography variant="body1" sx={{ my: 1, mb: 3 }}>
          Create your first team now to organize your projects and track your tasks.
        </Typography>
        <Button variant="contained" startIcon={<AddCircleIcon />} href="/teams/add">
          Create new team
        </Button>
      </Box>
    </Grid>
  </Grid>
);

const ListTeams = () => {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState(true);

  useEffect(() => {
    TeamsService.getTeams().then((fetchedTeams) => {
      setTeams(fetchedTeams);
      setLoading(false);
    });
  }, []);

  return (
    !loading && (
      <>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Typography variant="h4" component="h4">
            List of Teams
          </Typography>
          <Button variant="outlined" href="/teams/add" startIcon={<GroupAddIcon />}>
            Create new team
          </Button>
        </Stack>
        {teams.length > 0 ? (
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
                    {team.users.filter((user) => user.firstName).length ? (
                      <Tooltip
                        placement="right"
                        title={
                          <div>
                            {team.users
                              .filter((user) => user.firstName)
                              .map((user) => (
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
                    ) : (
                      <TableCell align="center">{team.users.length}</TableCell>
                    )}
                    <TableCell size="small" align="right">
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={1}
                      >
                        <IconButton href={`/team/${team._id}/users`} color="primary">
                          <PersonAddIcon />
                        </IconButton>
                        <IconButton color="warning" href={`/team/${team._id}/edit`}>
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
        ) : (
          <TeamEmptyState />
        )}
      </>
    )
  );
};

export default ListTeams;

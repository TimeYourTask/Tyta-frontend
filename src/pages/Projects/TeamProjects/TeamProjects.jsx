import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

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

import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ProjectService from '../../../store/services/projects.service';

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const TeamProjects = () => {
  const { teamID } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    ProjectService.getUserProjects(currentUser.id, teamID).then((userProjects) => {
      setProjects(userProjects);
    });
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Typography variant="h4" component="h4">
          List of Projects
        </Typography>
        <Button
          variant="outlined"
          href={`/team/${teamID}/projects/add`}
          startIcon={<AddCircleIcon />}
        >
          Create new project
        </Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Users</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects &&
              projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <Link to={`/team/${project._id}/project/${project._id}`}>{project.name}</Link>
                  </TableCell>
                  {project.users.length && (
                    <Tooltip
                      placement="right"
                      title={
                        <div>
                          {project.users.map((user) => (
                            <div key={user._id}>
                              {capitalize(user.user.firstName)}
                              {user.role === 'admin' ? ' (Admin)' : ''}
                            </div>
                          ))}
                        </div>
                      }
                    >
                      <TableCell align="center">{project.users.length}</TableCell>
                    </Tooltip>
                  )}
                  <TableCell size="small" align="right">
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      spacing={1}
                    >
                      <IconButton href={`/team/${project._id}/users`} color="primary">
                        <PersonAddIcon />
                      </IconButton>
                      <IconButton color="warning" href={`/team/${project._id}/update`}>
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

export default TeamProjects;

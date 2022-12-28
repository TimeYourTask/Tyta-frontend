import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Box,
  Grid,
} from '@mui/material';

import {
  AddCircle as AddCircleIcon,
  Visibility as VisibilityIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

import ProjectService from '../../../store/services/projects.service';
import { SET_NOTIFICATION } from '../../../store/actions/types';

import ProjectEmptyStateImg from '../../../assets/project-empty-state.svg';

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const ProjectEmptyState = ({ teamID }) => (
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
          <strong>No projects yet!</strong>
        </Typography>
        <Typography variant="body1" sx={{ my: 1, mb: 3 }}>
          Create your first project now to organize your teams and track your tasks.
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          href={`/team/${teamID}/projects/add`}
        >
          Create new project
        </Button>
      </Box>
    </Grid>
  </Grid>
);

const TeamProjects = () => {
  const dispatch = useDispatch();

  const { teamID } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    ProjectService.getUserProjects(currentUser.id, teamID).then((userProjects) => {
      setProjects(userProjects);
      setLoading(false);
    });
  }, []);

  return (
    !loading && (
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
        {projects.length > 0 ? (
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
                {projects.map((project) => {
                  const isCurrentUserAdminOfProject = project.users.some(
                    (user) => user.user._id === currentUser.id && user.role === 'admin'
                  );
                  return (
                    <TableRow key={project._id}>
                      <TableCell>
                        <Link to={`/team/${project._id}/project/${project._id}`}>
                          {project.name}
                        </Link>
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
                          <IconButton
                            href={`/team/${teamID}/project/${project._id}`}
                            color="grey.500"
                          >
                            <VisibilityIcon />
                          </IconButton>
                          {isCurrentUserAdminOfProject && (
                            <>
                              <IconButton
                                href={`/team/${teamID}/project/${project._id}/users`}
                                color="primary"
                              >
                                <PersonAddIcon />
                              </IconButton>
                              <IconButton
                                color="warning"
                                href={`/team/${teamID}/project/${project._id}/edit`}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                onClick={() => {
                                  ProjectService.deleteProject(project._id);
                                  setProjects(projects.filter((item) => item._id !== project._id));
                                  dispatch({
                                    type: SET_NOTIFICATION,
                                    payload: {
                                      message: `${project.name} successfully deleted!`,
                                      type: 'success',
                                    },
                                  });
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <ProjectEmptyState teamID={teamID} />
        )}
      </>
    )
  );
};

export default TeamProjects;

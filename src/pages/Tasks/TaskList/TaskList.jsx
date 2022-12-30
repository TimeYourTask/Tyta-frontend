import React from 'react';
import { useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Grid, Stack, Button, Typography, Paper, Card, IconButton } from '@mui/material';

import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';

import TasksService from '../../../store/services/tasks.service';
import { status } from '../utils';

const Column = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[800],
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  elevation: 0,
}));

const TaskList = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    TasksService.getProjectTasks(projectId).then((projectTasks) => {
      setTasks(projectTasks);
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      title: 'Not started',
      param: 'not-started',
      tasks: tasks.filter((task) => task.status === status.NOT_STARTED),
    },
    {
      title: 'In progress',
      param: 'in-progress',
      tasks: tasks.filter((task) => task.status === status.IN_PROGRESS),
    },
    {
      title: 'Done',
      param: 'done',
      tasks: tasks.filter((task) => task.status === status.DONE),
    },
  ];

  return (
    !loading && (
      <>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" component="h4">
            Tasks
          </Typography>
          <Button variant="outlined" href="/tasks/add" startIcon={<AddCircleIcon />}>
            Create new task
          </Button>
        </Stack>
        <Grid container spacing={1}>
          {columns.map((column) => (
            <Grid item xs={3}>
              <Column>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                  mx={1}
                >
                  <Typography variant="body" component="h6" color="grey.700">
                    {column.title} - {column.tasks.length}
                  </Typography>
                  <IconButton
                    aria-label="delete"
                    href={`/tasks/add?status=${column.param}`}
                    size="small"
                  >
                    <AddCircleIcon fontSize="small" />
                  </IconButton>
                </Stack>
                {column.tasks.map((task) => (
                  <Card sx={{ padding: 2, mb: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography>{task.title}</Typography>

                      <IconButton aria-label="edit" href={`/task/${task._id}/edit`} size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                    {task.description && (
                      <Typography variant="body2">{task.description}</Typography>
                    )}
                  </Card>
                ))}
              </Column>
            </Grid>
          ))}
        </Grid>
      </>
    )
  );
};

export default TaskList;

import React from 'react';
import { useParams } from 'react-router-dom';

import { Button, Card, CardActionArea, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';

import TasksService from '../../../store/services/tasks.service';
import { status } from '../utils';
import openTaskDialog from '../../../helpers/openTaskDialog';

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
          <Button variant="outlined" href="tasks/add" startIcon={<AddCircleIcon />}>
            Create new task
          </Button>
        </Stack>
        <Grid container spacing={1}>
          {columns.map((column) => (
            <Grid item key={column.param} xs={3}>
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
                  {column.param.toUpperCase() !== status.DONE && (
                    <IconButton
                      aria-label="add"
                      href={`tasks/add?status=${column.param}`}
                      size="small"
                    >
                      <AddCircleIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
                {column.tasks.map((task) => (
                  <Card sx={{ mb: 1 }} key={task._id}>
                    <CardActionArea
                      sx={{ padding: 2 }}
                      onClick={() => openTaskDialog(task._id)}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography>{task.title}</Typography>

                        <IconButton aria-label="edit" href={`/task/${task._id}/edit`} size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                      {task.description && (
                        <Typography variant="body2">
                          {task.description.length > 50
                            ? `${task.description.substring(0, 50)}...`
                            : task.description}
                        </Typography>
                      )}
                    </CardActionArea>
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

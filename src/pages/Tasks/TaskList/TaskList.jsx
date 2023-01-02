import React from 'react';
import { useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Grid, Stack, Button, Typography, Paper, Card, IconButton, CardActionArea, Dialog, DialogTitle, Slide, Skeleton, DialogContent, Box } from '@mui/material';

import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';

import TasksService from '../../../store/services/tasks.service';
import { status } from '../utils';
import UsersService from '../../../store/services/users.service';
import { capitalize, formatName, formatDate } from '../../../helpers/utils';

const Column = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[800],
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  elevation: 0,
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const TaskList = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(true);
  const [modalTaskData, setModalTaskData] = React.useState(null);

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

  const getTaskTimerData = async (taskId) => {
    setModalTaskData(null);
    setModalLoading(true);
    setModalOpen(true);

    const task = await TasksService.getOneTask(taskId);
    const timer = await TasksService.getOneTimer(taskId);
    const reporter = await UsersService.getOneUser(task.reporter);
    const assigned = await UsersService.getOneUser(task.assigned);

    if (timer) task.timer = timer.timeTask.time;

    if (reporter) {
      task.reporter = formatName(reporter);
    } else {
      task.reporter = 'Not defined';
    }

    if (assigned) {
      task.assigned = formatName(assigned);
    } else {
      task.assigned = 'Not defined';
    }

    setModalTaskData(task);
    setModalLoading(false);
  };

  const renderStatusModal = (taskStatus) => {
    switch (taskStatus) {
      case status.NOT_STARTED:
        return (
          <Paper elevation={0} sx={{ backgroundColor: 'grey.400', p: 1 }}>
            <Typography color="grey.600" variant="body2" fontWeight={600}>
              Not started
            </Typography>
          </Paper>
        );

      case status.IN_PROGRESS:
        return (
          <Paper elevation={0} sx={{ backgroundColor: 'info.main', p: 1 }}>
            <Typography color="#FFFFFF" variant="body2" fontWeight={600}>
              In progress
            </Typography>
          </Paper>
        );

      case status.DONE:
        return (
          <Paper elevation={0} sx={{ backgroundColor: 'success.main', p: 1 }}>
            <Typography color="#FFFFFF" variant="body2" fontWeight={600}>
              Done
            </Typography>
          </Paper>
        );

      default:
        return (
          <Paper>
            Undefined
          </Paper>
        );
    }
  };

  return (
    !loading && (
      <>
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          TransitionComponent={Transition}
          maxWidth="md"
        >
          {modalLoading ? (
            <Stack sx={{ width: '900px' }} direction="row" justifyContent="space-between">
              <DialogTitle>
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width={200} />
              </DialogTitle>
            </Stack>
          ) : (
            <Stack sx={{ width: '900px' }} direction="row" justifyContent="space-between">
              <Box sx={{ flexGrow: 1 }}>
                <DialogTitle>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5">{capitalize(modalTaskData.title)}</Typography>
                    {renderStatusModal(modalTaskData.status)}
                  </Stack>
                </DialogTitle>
                <DialogContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>Description</Typography>
                    <Typography
                      variant="body1"
                      sx={{ p: 1, borderRadius: '4px', ':hover': { backgroundColor: '#EBECF0' } }}
                    >
                      {modalTaskData.description || 'No description...'}
                    </Typography>
                  </Box>

                  <Column>
                    <Typography variant="body" component="h6" color="grey.700" mb={1} mx={1}>
                      Timers
                    </Typography>
                    {modalTaskData.timer
                      ? modalTaskData.timer.map((timer) => (
                        <Card sx={{ mb: 1, p: 2 }} key={timer._id}>
                          <Stack direction="row">
                            <Typography variant="subtitle1" fontWeight={600}>Start:</Typography>
                            <Typography variant="body1" sx={{ mx: 1 }}>{formatDate(new Date(timer.start_date))}</Typography>
                          </Stack>
                          <Stack direction="row">
                            <Typography variant="subtitle1" fontWeight={600}>End:</Typography>
                            <Typography variant="body1" sx={{ mx: 1 }}>{formatDate(new Date(timer.start_date))}</Typography>
                          </Stack>
                        </Card>
                      ))
                      : (
                        <Card sx={{ mb: 1, p: 2, backgroundColor: 'grey.300' }}>
                          <Typography color="grey.600">No timer started on this task</Typography>
                        </Card>
                      )
                    }
                  </Column>
                </DialogContent>
              </Box>

              <Box sx={{ pr: 2, pt: 2 }}>
                <Paper elevation={2} sx={{ p: 1, mb: 2, minWidth: '180px' }}>
                  <Typography variant="subtitle1" fontWeight={600}>Assigned</Typography>
                  <Typography variant="body1">{modalTaskData.assigned}</Typography>
                </Paper>
                <Paper elevation={2} sx={{ p: 1, minWidth: '180px' }}>
                  <Typography variant="subtitle1" fontWeight={600}>Reporter</Typography>
                  <Typography variant="body1">{modalTaskData.reporter}</Typography>
                </Paper>
              </Box>
            </Stack>
          )}
        </Dialog>

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
                    <CardActionArea sx={{ padding: 2 }} onClick={() => getTaskTimerData(task._id)}>
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

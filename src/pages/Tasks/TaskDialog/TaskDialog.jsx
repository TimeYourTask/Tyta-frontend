import { Pause as PauseIcon, PlayArrow as StartIcon } from '@mui/icons-material';
import { Box, Button, Card, Dialog, DialogContent, DialogTitle, Paper, Skeleton, Slide, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize, formatDate, timeDifference } from '../../../helpers/utils';
import { handleOpenTaskDialog, handleTaskDialogData, handleTimerStatusTaskDialog } from '../../../store/reducers/taskDialog';
import tasksService from '../../../store/services/tasks.service';
import { status } from '../utils';

const Column = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[800],
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  elevation: 0,
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const TaskDialog = () => {
  const dispatch = useDispatch();
  const { open, loading, taskData, timerStatus } = useSelector((state) => state.taskDialog);

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

  const updateTaskData = (isUpdate) => {
    const newTask = {
      ...taskData,
      timer: isUpdate.result.time,
    };
    dispatch(handleTaskDialogData(newTask));
    dispatch(handleTimerStatusTaskDialog(!timerStatus));
  };

  const startTimer = async () => {
    const isUpdate = await tasksService.startTimer(taskData._id);

    if (isUpdate) updateTaskData(isUpdate);
  };

  const endTimer = async () => {
    const isUpdate = await tasksService.endTimer(taskData._id);

    if (isUpdate) updateTaskData(isUpdate);
  };

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(handleOpenTaskDialog(false))}
      TransitionComponent={Transition}
      maxWidth="md"
    >
      {loading ? (
        <Stack sx={{ width: '900px' }} direction="row" justifyContent="space-between">
          <DialogTitle>
            <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width={200} />
          </DialogTitle>
        </Stack>
      ) : (
        <Stack sx={{ width: '900px' }} direction="row" justifyContent="space-between">
          <Box sx={{ flexGrow: 1 }}>
            <DialogTitle>
              <Stack direction="row">
                <Typography flexGrow={1} variant="h5">{capitalize(taskData.title)}</Typography>
                {timerStatus ? (
                  <Button variant="contained" onClick={startTimer} color="success" sx={{ mx: 2, borderRadius: '50%', p: 1, minWidth: 'unset' }}>
                    <StartIcon />
                  </Button>
                ) : (
                  <Button variant="contained" onClick={endTimer} color="error" sx={{ mx: 2, borderRadius: '50%', p: 1, minWidth: 'unset' }}>
                    <PauseIcon />
                  </Button>
                )}
                {renderStatusModal(taskData.status)}
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>Description</Typography>
                <Typography
                  variant="body1"
                  sx={{
                    p: 1,
                    borderRadius: '4px',
                    maxHeight: '300px',
                    overflow: 'hidden visible',
                    ':hover': {
                      backgroundColor: '#EBECF0',
                    },
                  }}
                >
                  {taskData.description || 'No description...'}
                </Typography>
              </Box>

              <Column sx={{ maxHeight: '300px', overflow: 'hidden visible' }}>
                <Typography variant="body" component="h6" color="grey.700" mb={1} mx={1}>
                  Timers
                </Typography>
                {taskData.timer
                  ? taskData.timer.map((timer) => (
                    <Card sx={{ mb: 1, p: 2 }} key={timer._id}>
                      <Stack direction="row">
                        <Typography variant="subtitle1" fontWeight={600}>Time:</Typography>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                          {timer.end_date ? timeDifference(new Date(timer.start_date), new Date(timer.end_date)) : 'Timer is running'}
                        </Typography>
                      </Stack>
                      <Stack direction="row">
                        <Typography variant="subtitle1" fontWeight={600}>Start:</Typography>
                        <Typography variant="body1" sx={{ mx: 1 }}>{formatDate(new Date(timer.start_date))}</Typography>
                      </Stack>
                      <Stack direction="row">
                        <Typography variant="subtitle1" fontWeight={600}>End:</Typography>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                          {timer.end_date ? formatDate(new Date(timer.end_date)) : 'Timer is running'}
                        </Typography>
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
              <Typography variant="body1">{taskData.assigned}</Typography>
            </Paper>
            <Paper elevation={2} sx={{ p: 1, minWidth: '180px' }}>
              <Typography variant="subtitle1" fontWeight={600}>Reporter</Typography>
              <Typography variant="body1">{taskData.reporter}</Typography>
            </Paper>
          </Box>
        </Stack>
      )}
    </Dialog>
  );
};

export default TaskDialog;

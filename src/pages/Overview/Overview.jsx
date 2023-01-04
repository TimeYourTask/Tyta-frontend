import React from 'react';

import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import { Typography, Grid, Card, CardActions, Button, CardContent, Tooltip } from '@mui/material';
import {
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { SET_NOTIFICATION } from '../../store/actions/types';

import TeamsService from '../../store/services/teams.service';
import TimeTaskService from '../../store/services/timeTask.service';
import { convertMsToTime } from '../../helpers/utils';
import openTaskDialog from '../../helpers/openTaskDialog';

const Overview = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [teamCount, setTeamCount] = React.useState(0);
  const [timeTask, setTimeTask] = React.useState({});

  const fetchRunningTask = async () => {
    await TimeTaskService.getUserTimer().then((data) => setTimeTask(data));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const fetchTeamsSize = await TeamsService.getTeams();
      setTeamCount(fetchTeamsSize.length);
      fetchRunningTask();
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const time = setInterval(() => {
      if (timeTask?.isRunning) {
        setTimeTask((prevTime) => ({
          task_id: prevTime.task_id,
          isRunning: true,
          total: prevTime.total + 1000,
          timeTask: prevTime.timeTask,
        }));
      }
    }, 1000);
    return () => clearInterval(time);
  }, [timeTask]);

  const statsBlocks = [
    {
      key: 'in-progress',
      title: 'Ticket in Progress',
      helpText: 'You working on this ticket',
      content: timeTask ? convertMsToTime(timeTask?.total) : 'No task yet!',
      actions: [
        {
          text: 'Start',
          key: 'start',
          icon: <PlayArrowIcon />,
          action: async () => {
            await TimeTaskService.startTimer(timeTask.task_id).then(() => {
              dispatch({
                type: SET_NOTIFICATION,
                payload: {
                  message: 'Task successfully started!',
                  type: 'success',
                },
              });
              fetchRunningTask();
            });
          },
          disabled: timeTask?.isRunning,
        },
        {
          text: 'Pause',
          key: 'pause',
          icon: <PauseIcon />,
          action: async () => {
            await TimeTaskService.endTimer(timeTask.task_id).then(() => {
              dispatch({
                type: SET_NOTIFICATION,
                payload: {
                  message: 'Task successfully paused!',
                  type: 'success',
                },
              });
              fetchRunningTask();
            });
          },
          disabled: timeTask && !timeTask?.isRunning,
        },
        {
          text: 'See this ticket',
          key: 'all-tickets',
          action: () => openTaskDialog(timeTask.task_id),
          disabled: !timeTask,
        },
      ],
      style: {
        cardColor: theme.palette.primary.main,
        textColor: theme.palette.primary.contrastText,
      },
    },
    {
      key: 'teams',
      title: 'Team you belong to',
      content: teamCount,
      actions: [
        {
          text: 'See your teams',
          key: 'all-teams',
          link: '/teams',
        },
      ],
      style: {
        cardColor: theme.palette.grey[100],
        textColor: theme.palette.black,
      },
    },
    {
      key: 'projects',
      title: 'Your current or pending tickets',
      helpText: 'Number of open or pending tickets assigned to you',
      content: 10,
      actions: [
        {
          text: 'Open a random ticket',
          key: 'all-projects',
          link: '/projects',
        },
      ],
      style: {
        cardColor: theme.palette.grey[100],
        textColor: theme.palette.black,
      },
    },
  ];

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid container spacing={2}>
        {statsBlocks.map((block) => (
          <Grid key={block.key} item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: block.style.cardColor,
                color: block.style.textColor,
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  gutterBottom
                >
                  {block.title}
                  {block.helpText && (
                    <Tooltip title={block.helpText} placement="top" arrow>
                      <InfoIcon fontSize="small" sx={{ color: theme.palette.grey[100] }} />
                    </Tooltip>
                  )}
                </Typography>
                <Typography variant="h3" component="div" sx={{ fontWeight: 500 }}>
                  {block.content}
                </Typography>
              </CardContent>
              <CardActions sx={{ backgroundColor: theme.palette.grey[50] }}>
                {block.actions.map((action) => (
                  <Button
                    key={action.key}
                    size="small"
                    href={action.link}
                    onClick={action.action}
                    disabled={action.disabled}
                  >
                    {action.text}
                  </Button>
                ))}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container alignItems="center" justifyContent="space-between" mt={3} mb={2}>
        <Typography variant="h6">Statistics</Typography>
        <Button>See all statistics</Button>
      </Grid>
    </>
  );
};

export default Overview;

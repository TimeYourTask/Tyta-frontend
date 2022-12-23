import './Overview.scss';

import React from 'react';

import { useTheme } from '@mui/material/styles';
import { Typography, Grid, Card, CardActions, Button, CardContent, Tooltip } from '@mui/material';
import {
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

import TeamsService from '../../store/services/teams.service';

const Overview = () => {
  const theme = useTheme();
  const [teamCount, setTeamCount] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      const fetchTeamsSize = await TeamsService.getTeams();
      setTeamCount(fetchTeamsSize.length);
    };
    fetchData();
  }, []);

  const statsBlocks = [
    {
      key: 'in-progress',
      title: 'Ticket in Progress',
      helpText: 'You working on this ticket',
      content: '10min20s',
      actions: [
        {
          key: 'pause',
          icon: <PauseIcon />,
          action: () => alert('Pause'),
          text: 'Pause',
        },
        {
          key: 'start',
          icon: <PlayArrowIcon />,
          action: () => alert('Start'),
          text: 'Start',
        },
        {
          key: 'all-tickets',
          link: '/tickets/TEST',
          text: 'See this ticket',
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
          key: 'all-teams',
          link: '/teams',
          text: 'See your teams',
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
          key: 'all-projects',
          link: '/projects',
          text: 'Open a random ticket',
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
                  <Button key={action.key} size="small" href={action.link} onClick={action.action}>
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

import './Home.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { styled } from '@mui/system';
import { Stack, Box, Card, CardContent, Typography, Button } from '@mui/material';

import Homepage from '../../assets/homepage.svg';
import Customer from '../../assets/customer.png';

const globalStyle = {
  width: '33%',
  transition: 'all 200ms ease-in-out',
};

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  transform: 'scale(0.92)',
  '&:hover': {
    transform: 'scale(0.98)',
  },
  ...globalStyle,
}));

const StyledSelectedCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    transform: 'scale(1.06)',
  },
  ...globalStyle,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: '50px',
  textAlign: 'center',
  marginBottom: 50,
}));

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/overview');
    }
  });

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: 4, marginY: 4 }}
      >
        <Box sx={{ width: '40%' }}>
          <Typography variant="h2" sx={{ marginBottom: 3 }}>
            Take <strong>Back Control Of Your Team</strong> Productivity
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 5 }}>
            What if you could track the time your teams spend on each of their tasks to support them
            and gain productivity, adapting your goals to your teams.
          </Typography>
          <Button variant="contained" href="/register">
            Track your time now!
          </Button>
        </Box>
        <Box
          component="img"
          sx={{
            width: '40%',
          }}
          alt="Time keeper illustration"
          src={Homepage}
        />
      </Stack>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box sx={{ width: '30%', padding: 4 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Our features
          </Typography>
          <Typography variant="body2">
            TimeYourTask is an all-in-one service that allows you to support your teams according to
            their needs.
          </Typography>
        </Box>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          component="ul"
        >
          <StyledCard variant="outlined" component="li">
            <CardContent>
              <Typography variant="h6">Organize your Team</Typography>
              <Typography variant="body2">
                An all-in-one organization platform, allowing you to track the time of your tasks
              </Typography>
            </CardContent>
          </StyledCard>
          <StyledSelectedCard variant="outlined" component="li">
            <CardContent>
              <Typography variant="h6">Saving Time</Typography>
              <Typography variant="body2">
                A better understanding of the time spent on each task allows you to adapt your
                projects to each member
              </Typography>
            </CardContent>
          </StyledSelectedCard>
          <StyledCard variant="outlined" component="li">
            <CardContent>
              <Typography variant="h6">Support your team</Typography>
              <Typography variant="body2">
                Finding the points where your team need to be accompanied and gain in productivity
              </Typography>
            </CardContent>
          </StyledCard>
        </Stack>
      </Stack>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center" py={6} mt={20}>
        <Card variant="outlined" sx={{ overflow: 'visible', width: '100%' }}>
          <CardContent sx={{ display: 'flex', position: 'relative' }}>
            <Box
              component="img"
              sx={{
                position: 'absolute',
                maxHeight: '580px',
                right: 0,
                bottom: 0,
                transform: 'scaleX(-1)',
              }}
              alt="Time keeper illustration"
              src={Customer}
            />
            <Box sx={{ width: '55%', p: 4 }}>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Client Review
              </Typography>
              <Typography variant="body2" mb={3}>
                My team and I have been working with TimeYourTask for several months now and we see
                a real difference in the management of our projects. We didn't take the time to
                track our tasks before, but now we know how much time each team spends on tasks and
                it allows us to better adapt our goals. As a project manager, I was able to help
                some teams to learn about the topics they were having trouble with. Everyone is very
                satisfied with this new tool, thank you!
              </Typography>
              <Typography variant="body2">
                <strong>Max Noulane</strong> - Product Manager at Microsoft
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Stack>
      <StyledBox>
        <Typography variant="h4" sx={{ width: '70%', margin: '0 auto 30px auto' }}>
          What if, like Max, you took your projects to the next level with TimeYourTask?
        </Typography>
        <Button variant="contained" color="white" href="/register">
          Track your time now!
        </Button>
        <Typography variant="caption" sx={{ display: 'block', marginTop: 4 }}>
          TimeYourTask is commitment-free, 100% free for small teams and easy to use. So what are
          you waiting for to start managing your team with us?
        </Typography>
      </StyledBox>
    </>
  );
};

export default Home;

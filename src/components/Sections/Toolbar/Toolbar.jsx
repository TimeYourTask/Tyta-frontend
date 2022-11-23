import './Toolbar.scss';

import React from 'react';
import { styled } from '@mui/system';
import {
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  Grid,
  ListItemIcon,
} from '@mui/material';
import {
  KeyboardArrowDown,
  Dashboard as DashboardIcon,
  AssignmentInd as AssignmentIndIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 'fit-content',
  marginRight: theme.spacing(2),
  '> svg': {
    color: theme.palette.grey[800],
    fontSize: '1.4rem',
  },
}));

const menu = {
  ROADMAP: 'roadmap',
};

const roadMapSubFields = [
  {
    icon: <AssignmentIcon />,
    label: 'All tasks',
    value: 'all-tasks',
    target: '/all-tasks',
  },
  {
    icon: <AssignmentIndIcon />,
    label: 'My tasks',
    value: 'my-tasks',
    target: '/my-tasks',
  },
];

const ToolBar = () => {
  const [open, setOpen] = React.useState([menu.ROADMAP]);

  const openMenu = (menuItem) => {
    if (open.includes(menuItem)) {
      setOpen(open.filter((e) => e !== menuItem));
    } else setOpen([menuItem, ...open]);
  };

  return (
    <Paper
      elevation={0}
      sx={{ height: '90vh', borderTop: 0 }}
      variant="outlined"
      square
    >
      <List component="nav" disablePadding sx={{ height: '100%' }}>
        <Grid
          container
          sx={{
            padding: 1.5,
            height: '100%',
          }}
        >
          <Grid item xs={12}>
            <ListItemButton
              sx={{
                py: 2,
              }}
              component={Link}
              to="/overview"
            >
              <StyledListItemIcon>
                <DashboardIcon />
              </StyledListItemIcon>
              <ListItemText
                primary="Overview"
                primaryTypographyProps={{
                  fontSize: '.9rem',
                  fontWeight: 'medium',
                  lineHeight: '20px',
                  mb: '2px',
                }}
                sx={{ my: 0 }}
              />
            </ListItemButton>
            <Box>
              <ListItemButton
                onClick={() => openMenu(menu.ROADMAP)}
                sx={{
                  py: '2px',
                }}
              >
                <ListItemText
                  primary="Roadmap"
                  primaryTypographyProps={{
                    fontSize: '.8rem',
                    lineHeight: '20px',
                    mb: '2px',
                    color: 'grey.700',
                    fontWeight: 'medium',
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 1,
                    transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                  }}
                />
              </ListItemButton>
              {open.includes(menu.ROADMAP) &&
                roadMapSubFields.map((item) => (
                  <ListItemButton
                    key={item.value}
                    sx={{ py: 0, minHeight: 50, fontWeight: 'medium' }}
                    component={Link}
                    to={item.target}
                  >
                    <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: 'medium',
                        fontSize: '.9rem',
                      }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ height: 'fit-content', alignSelf: 'flex-end' }}
          >
            <Divider />
            <ListItemButton
              sx={{
                py: 2,
              }}
              component={Link}
              to="/manage-project"
            >
              <StyledListItemIcon>
                <SettingsIcon />
              </StyledListItemIcon>
              <ListItemText
                primary="Manage project"
                primaryTypographyProps={{
                  fontSize: '.9rem',
                  fontWeight: 'medium',
                  lineHeight: '20px',
                  mb: '2px',
                }}
                sx={{ my: 0 }}
              />
            </ListItemButton>
          </Grid>
        </Grid>
      </List>
    </Paper>
  );
};

export default ToolBar;

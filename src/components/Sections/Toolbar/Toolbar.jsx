import './Toolbar.scss';

import React from 'react';
import { styled } from '@mui/system';
import {
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
  Groups as GroupsIcon,
  GroupAdd as GroupAddIcon,
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

const menuSections = {
  TEAMS: 'teams',
};

const menuItems = [
  {
    section: menuSections.TEAMS,
    links: [
      {
        icon: <GroupsIcon />,
        label: 'Your teams',
        value: 'your-teams',
        target: '/teams',
      },
      {
        icon: <GroupAddIcon />,
        label: 'New team',
        value: 'new-team',
        target: '/teams/add',
      },
    ],
  },
];

const ToolBar = () => {
  const [open, setOpen] = React.useState([menuSections.TEAMS]);

  const openMenu = (menuItem) => {
    if (open.includes(menuItem)) {
      setOpen(open.filter((e) => e !== menuItem));
    } else setOpen([menuItem, ...open]);
  };

  return (
    <List component="nav" disablePadding sx={{ height: '100%' }}>
      <Grid
        container
        sx={{
          p: 1.5,
          paddingBottom: 0,
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
            {menuItems.map((menuItem) => (
              <React.Fragment key={menuItem.section}>
                <ListItemButton
                  onClick={() => openMenu(menuItem.section)}
                  sx={{
                    py: '2px',
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: '.8rem',
                      lineHeight: '20px',
                      mb: '2px',
                      color: 'grey.700',
                      fontWeight: 'medium',
                      textTransform: 'capitalize',
                    }}
                    sx={{ my: 0 }}
                  >
                    {menuItem.section}
                  </ListItemText>
                  <KeyboardArrowDown
                    sx={{
                      mr: -1,
                      opacity: 1,
                      transform: open.includes(menuItem.section) ? 'rotate(-180deg)' : 'rotate(0)',
                      transition: '0.2s',
                    }}
                  />
                </ListItemButton>
                {open.includes(menuItem.section) &&
                  menuItem.links.map((item) => (
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
              </React.Fragment>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ height: 'fit-content', alignSelf: 'flex-end' }}>
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
              primaryTypographyProps={{
                fontSize: '.9rem',
                fontWeight: 'medium',
                lineHeight: '20px',
              }}
              sx={{ my: 0 }}
            >
              Settings
            </ListItemText>
          </ListItemButton>
        </Grid>
      </Grid>
    </List>
  );
};

export default ToolBar;

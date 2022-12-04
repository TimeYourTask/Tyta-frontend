import React from 'react';
import { useSelector } from 'react-redux';
import { Snackbar, Alert, Fade } from '@mui/material';

import useNotification from '../../hooks/useNotifications';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { closeNotification } = useNotification();

  const handleClose = (_, reason) => reason !== 'clickaway' && closeNotification();

  return (
    <Snackbar
      open={notification.open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      TransitionComponent={Fade}
      autoHideDuration={notification.timeout}
      onClose={handleClose}
    >
      <Alert variant="filled" onClose={handleClose} severity={notification.type}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;

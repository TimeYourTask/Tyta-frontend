import './Home.scss';

import React from 'react';

import useNotification from '../../hooks/useNotifications';

const Home = () => {
  const { displayNotification } = useNotification();

  return (
    <>
      <button
        type="button"
        onClick={() => displayNotification({ message: 'Success', type: 'success' })}
      >
        Success
      </button>
      <button
        type="button"
        onClick={() => displayNotification({ message: 'Error', type: 'error' })}
      >
        Error
      </button>
      <button
        type="button"
        onClick={() => displayNotification({ message: 'Warning', type: 'warning' })}
      >
        Warning
      </button>
      <button type="button" onClick={() => displayNotification({ message: 'Info', type: 'info' })}>
        Info
      </button>
    </>
  );
};

export default Home;

import './Default.layout.scss';

import React from 'react';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => (
  <main>
    <Outlet />
  </main>
);

export default DefaultLayout;

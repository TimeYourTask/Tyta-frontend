import './Default.layout.scss';

import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../Sections/Header/Header';
import Footer from '../../Sections/Footer/Footer';

const DefaultLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default DefaultLayout;

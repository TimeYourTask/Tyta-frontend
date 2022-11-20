import { configureStore } from '@reduxjs/toolkit';
import initSlice from './initSlice';

export default configureStore({
  reducer: {
    init: initSlice
  }
})

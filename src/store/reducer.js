import { configureStore } from '@reduxjs/toolkit';
import defaultSlice from './initSlice';

export default configureStore({
  reducer: {
    init: defaultSlice,
  },
});

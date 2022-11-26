import { createSlice } from '@reduxjs/toolkit';

export const initSlice = createSlice({
  name: 'init',
  initialState: {
    user: null,
  },
});

export default initSlice.reducer;

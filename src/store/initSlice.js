import { createSlice } from '@reduxjs/toolkit';

export const initSlice = createSlice({
  name: 'init',
  initialState: {
    message: "Init store"
  }
})

export default initSlice.reducer
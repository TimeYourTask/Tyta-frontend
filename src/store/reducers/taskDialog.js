import { createSlice } from '@reduxjs/toolkit';

const taskDialog = createSlice({
  name: 'taskDialog',
  initialState: {
    open: false,
    loading: true,
    taskData: null,
    timerStatus: true,
  },
  reducers: {
    handleOpenTaskDialog(state, action) {
      state.open = action.payload;
    },
    handleLoadingTaskDialog(state, action) {
      state.loading = action.payload;
    },
    handleTaskDialogData(state, action) {
      state.taskData = action.payload;
    },
    handleTimerStatusTaskDialog(state, action) {
      state.timerStatus = action.payload;
    },
  },
});

export const {
  handleOpenTaskDialog,
  handleLoadingTaskDialog,
  handleTaskDialogData,
  handleTimerStatusTaskDialog,
} = taskDialog.actions;

export default taskDialog.reducer;

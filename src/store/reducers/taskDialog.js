import { createSlice } from '@reduxjs/toolkit';

const taskDialog = createSlice({
  name: 'taskDialog',
  initialState: {
    open: false,
    loading: true,
    taskData: null,
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
  },
});

export const {
  handleOpenTaskDialog,
  handleLoadingTaskDialog,
  handleTaskDialogData,
} = taskDialog.actions;

export default taskDialog.reducer;

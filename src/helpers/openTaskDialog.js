import TasksService from '../store/services/tasks.service';
import UsersService from '../store/services/users.service';
import { formatName } from './utils';
import store from '../store/store';
import { handleLoadingTaskDialog, handleOpenTaskDialog, handleTaskDialogData, handleTimerStatusTaskDialog } from '../store/reducers/taskDialog';

const openTaskDialog = async (taskId) => {
  store.dispatch(handleTaskDialogData(null));
  store.dispatch(handleLoadingTaskDialog(true));
  store.dispatch(handleOpenTaskDialog(true));

  const task = await TasksService.getOneTask(taskId);
  const timer = await TasksService.getOneTimer(taskId);
  const reporter = await UsersService.getOneUser(task.reporter);
  const assigned = await UsersService.getOneUser(task.assigned);

  if (timer) {
    const lastTime = timer.timeTask.time[timer.timeTask.time.length - 1];
    if (lastTime.end_date) {
      store.dispatch(handleTimerStatusTaskDialog(true));
    } else {
      store.dispatch(handleTimerStatusTaskDialog(false));
    }
    task.timer = timer.timeTask.time;
  } else {
    store.dispatch(handleTimerStatusTaskDialog(true));
  }

  if (reporter) {
    task.reporter = formatName(reporter);
  } else {
    task.reporter = 'Not defined';
  }

  if (assigned) {
    task.assigned = formatName(assigned);
  } else {
    task.assigned = 'Not defined';
  }

  store.dispatch(handleTaskDialogData(task));
  store.dispatch(handleLoadingTaskDialog(false));
};

export default openTaskDialog;

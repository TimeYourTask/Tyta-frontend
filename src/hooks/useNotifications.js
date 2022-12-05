import { useDispatch } from 'react-redux';
import { setNotification, clearNotification } from '../store/actions/notification';

const useNotification = () => {
  const dispatch = useDispatch();

  const displayNotification = (notificationPayload) => {
    dispatch(setNotification(notificationPayload));
  };

  const closeNotification = () => {
    dispatch(clearNotification());
  };

  return { displayNotification, closeNotification };
};

export default useNotification;
